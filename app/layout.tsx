import type { Metadata } from 'next'
import './globals.css'
import NavClient from './NavClient'

export const metadata: Metadata = {
  title: 'DigiNurture — Engineering the Systems That Scale Your Business',
  description: 'From Hackathon-winning logic to enterprise-grade automation, DigiNurture builds the technical infrastructure for 2026\'s market leaders.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="cursor" />
        <div id="cursor-ring" />
        <NavClient />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const cur = document.getElementById('cursor');
              const ring = document.getElementById('cursor-ring');
              
              let mouseX = -100;
              let mouseY = -100;
              let ringX = -100;
              let ringY = -100;
              
              document.addEventListener('mousemove', e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
              });
              
              function tick() {
                // Smooth follow using linear interpolation (lerp)
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                
                if (cur) {
                  cur.style.setProperty('--x', mouseX + 'px');
                  cur.style.setProperty('--y', mouseY + 'px');
                }
                if (ring) {
                  ring.style.setProperty('--ring-x', ringX + 'px');
                  ring.style.setProperty('--ring-y', ringY + 'px');
                }
                requestAnimationFrame(tick);
              }
              requestAnimationFrame(tick);
              
              function addHoverListeners() {
                document.querySelectorAll('button, a, select, input, textarea, [data-cursor], [onclick]').forEach(el => {
                  if (el.dataset.cursorBound) return;
                  el.dataset.cursorBound = 'true';
                  el.addEventListener('mouseenter', () => {
                    if (cur) cur.style.setProperty('--scale', '2');
                    if (ring) ring.style.setProperty('--ring-scale', '1.4');
                  });
                  el.addEventListener('mouseleave', () => {
                    if (cur) cur.style.setProperty('--scale', '1');
                    if (ring) ring.style.setProperty('--ring-scale', '1');
                  });
                });
              }
              
              addHoverListeners();
              // Re-run hover listener attachment periodically or on DOM changes
              const observer = new MutationObserver(addHoverListeners);
              observer.observe(document.body, { childList: true, subtree: true });
              
              window.addEventListener('scroll', () => {
                const nb = document.getElementById('navbar');
                if (nb) nb.classList.toggle('nav-scrolled', window.scrollY > 60);
              });
            `
          }}
        />
      </body>
    </html>
  )
}
