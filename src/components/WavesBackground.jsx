import React, { useEffect, useRef } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  Clock,
  Vector2,
  Vector3,
} from "three";

const Rz = 8; // Max gradient colors

// Helper function to parse hex colors to Vector3 float representations
function parseHexColor(hex) {
  let cleaned = hex.trim();
  if (cleaned.startsWith("#")) {
    cleaned = cleaned.slice(1);
  }
  let r = 255,
    g = 255,
    b = 255;
  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else if (cleaned.length === 6) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  }
  return new Vector3(r / 255, g / 255, b / 255);
}

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK   = vec3(0.0);
const vec3 EMERALD = vec3(16.0, 185.0, 129.0) / 255.0;
const vec3 TEAL    = vec3(6.0,  182.0, 212.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(TEAL, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(EMERALD, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);
  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < 8; ++i) {
      if (i >= bottomLineCount) break;
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < 8; ++i) {
      if (i >= middleLineCount) break;
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < 8; ++i) {
      if (i >= topLineCount) break;
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

export default function WavesBackground({
  linesGradient = ["#06b6d4", "#10b981", "#a3e635"],
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [8],
  lineDistance = [28],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2, y: -0.7, rotate: -1 },
  animationSpeed = 1.7,
  interactive = true,
  bendRadius = 12,
  bendStrength = -2.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = "screen",
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef(new Vector2(-1000, -1000));
  const targetMouseRef = useRef(new Vector2(-1000, -1000));
  const isPointerActive = useRef(0);
  const blendInfluence = useRef(0);
  const parallaxOffset = useRef(new Vector2(0, 0));
  const targetParallaxOffset = useRef(new Vector2(0, 0));

  const getLineCount = (waveType) => {
    if (typeof lineCount === "number") return lineCount;
    if (!enabledWaves.includes(waveType)) return 0;
    const idx = enabledWaves.indexOf(waveType);
    return lineCount[idx] ?? 6;
  };

  const getLineDistance = (waveType) => {
    if (typeof lineDistance === "number") return lineDistance;
    if (!enabledWaves.includes(waveType)) return 0.1;
    const idx = enabledWaves.indexOf(waveType);
    return lineDistance[idx] ?? 0.1;
  };

  const topCount = enabledWaves.includes("top") ? getLineCount("top") : 0;
  const middleCount = enabledWaves.includes("middle") ? getLineCount("middle") : 0;
  const bottomCount = enabledWaves.includes("bottom") ? getLineCount("bottom") : 0;

  const topDist = enabledWaves.includes("top") ? getLineDistance("top") * 0.01 : 0.01;
  const middleDist = enabledWaves.includes("middle") ? getLineDistance("middle") * 0.01 : 0.01;
  const bottomDist = enabledWaves.includes("bottom") ? getLineDistance("bottom") * 0.01 : 0.01;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isRunning = true;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes("top") },
      enableMiddle: { value: enabledWaves.includes("middle") },
      enableBottom: { value: enabledWaves.includes("bottom") },
      topLineCount: { value: topCount },
      middleLineCount: { value: middleCount },
      bottomLineCount: { value: bottomCount },
      topLineDistance: { value: topDist },
      middleLineDistance: { value: middleDist },
      bottomLineDistance: { value: bottomDist },
      topWavePosition: {
        value: new Vector3(topWavePosition?.x ?? 10, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4),
      },
      middleWavePosition: {
        value: new Vector3(middleWavePosition?.x ?? 5, middleWavePosition?.y ?? 0, middleWavePosition?.rotate ?? 0.2),
      },
      bottomWavePosition: {
        value: new Vector3(bottomWavePosition?.x ?? 2, bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4),
      },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: Rz }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
    };

    // Apply color gradient parameters
    if (linesGradient && linesGradient.length > 0) {
      const gradientColors = linesGradient.slice(0, Rz);
      uniforms.lineGradientCount.value = gradientColors.length;
      gradientColors.forEach((hexColor, index) => {
        const rgb = parseHexColor(hexColor);
        uniforms.lineGradient.value[index].set(rgb.x, rgb.y, rgb.z);
      });
    }

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const handleResize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      const ratio = renderer.getPixelRatio();
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };

    handleResize();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (isRunning) handleResize();
          })
        : null;
    if (resizeObserver) resizeObserver.observe(container);

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ratio = renderer.getPixelRatio();
      targetMouseRef.current.set(x * ratio, (rect.height - y) * ratio);
      isPointerActive.current = 1;

      if (parallax) {
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;
        const px = (e.clientX - halfWidth) / rect.width;
        const py = -(e.clientY - halfHeight) / rect.height;
        targetParallaxOffset.current.set(px * parallaxStrength, py * parallaxStrength);
      }
    };

    const handlePointerLeave = () => {
      isPointerActive.current = 0;
    };

    if (interactive) {
      renderer.domElement.addEventListener("pointermove", handlePointerMove);
      renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    }

    let frameId = 0;
    const animate = () => {
      if (!isRunning) return;
      
      uniforms.iTime.value = clock.getElapsedTime();

      if (interactive) {
        mouseRef.current.lerp(targetMouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(mouseRef.current);
        blendInfluence.current += (isPointerActive.current - blendInfluence.current) * mouseDamping;
        uniforms.bendInfluence.value = blendInfluence.current;
      }

      if (parallax) {
        parallaxOffset.current.lerp(targetParallaxOffset.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(parallaxOffset.current);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (interactive) {
        renderer.domElement.removeEventListener("pointermove", handlePointerMove);
        renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [
    linesGradient,
    enabledWaves,
    lineCount,
    lineDistance,
    topWavePosition,
    middleWavePosition,
    bottomWavePosition,
    animationSpeed,
    interactive,
    bendRadius,
    bendStrength,
    mouseDamping,
    parallax,
    parallaxStrength,
    mixBlendMode,
  ]);

  return <div ref={containerRef} className="floating-lines-container" style={{ mixBlendMode }} />;
}
