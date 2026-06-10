import Link from 'next/link'
import Footer from './Footer'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="hero-content">
          <div className="hero-badge">◉ Systems Online — 2026 Edition</div>
          <h1>Where <em>Engineering</em><br />Meets Growth.</h1>
          <p className="hero-sub">
            From Hackathon-winning logic to enterprise-grade automation, DigiNurture builds the technical infrastructure for 2026&apos;s market leaders.
          </p>
          <div className="hero-actions">
            <Link href="/audit"><button className="btn-primary">Request a Systems Audit</button></Link>
            <Link href="/impact"><button className="btn-ghost">View Impact Lab →</button></Link>
          </div>
          <p className="hero-note">// No commitment. Deep technical insights.</p>
          <div className="hero-stats">
            <div><div className="stat-num">90%</div><div className="stat-label">Inquiry Automation Rate</div></div>
            <div><div className="stat-num">24/7</div><div className="stat-label">AI Lead Capture</div></div>
            <div><div className="stat-num">0ms</div><div className="stat-label">Response Latency Target</div></div>
            <div><div className="stat-num">3NF</div><div className="stat-label">Data Architecture Standard</div></div>
          </div>
        </div>
      </section>

      <div className="em-divider" />

      {/* Value Prop */}
      <section>
        <div className="section-tag">Core Capability</div>
        <h2 className="section-title">We <em>Architect</em> the Systems<br />that Scale Your Business.</h2>
        <p className="section-body">From AgriTech Decision Engines to Legal AI Intake, we replace manual labor with high-performance automation. We don&apos;t just build websites — we engineer revenue-generating ecosystems.</p>
        <div className="grid-3">
          <div className="glass-card">
            <div className="card-icon">🌱</div>
            <div className="card-title">AI-Intake Systems</div>
            <div className="card-body">Fully automated lead qualification pipelines. Captures, scores, and routes high-value prospects 24/7 without human intervention.</div>
            <div className="card-em">// Never miss a $10k lead again.</div>
          </div>
          <div className="glass-card">
            <div className="card-icon">🧠</div>
            <div className="card-title">Recommendation Engines</div>
            <div className="card-body">Predictive logic tuned for complex, domain-specific industries. AgriTech, Legal, Real Estate — precision at scale.</div>
            <div className="card-em">// Predictive logic for complex industries.</div>
          </div>
          <div className="glass-card">
            <div className="card-icon">⚡</div>
            <div className="card-title">Full-Stack Presence</div>
            <div className="card-body">MERN/SQL architectures built for speed, security, and conversion. Zero-latency performance on production-grade infrastructure.</div>
            <div className="card-em">// Speed and security of MERN-stack.</div>
          </div>
        </div>
      </section>

      <div className="em-divider" />

      {/* Service Matrix */}
      <section id="services">
        <div className="section-tag">Services</div>
        <h2 className="section-title">Services We <em>Provide</em></h2>
        <div className="glass-card" style={{ marginTop: '3.5rem' }}>
          <div className="service-row">
            <div className="service-num">01</div>
            <div><div className="service-name">AI-Intake &amp; Lead Triage Systems</div><div className="service-desc">End-to-end automated reception — qualify, route, schedule. <span className="service-tag">Never miss a $10k lead again.</span></div></div>
          </div>
          <div className="service-row">
            <div className="service-num">02</div>
            <div><div className="service-name">Custom Recommendation Engines</div><div className="service-desc">Domain-trained prediction models for agriculture, legal, real estate. <span className="service-tag">Predictive logic for complex industries.</span></div></div>
          </div>
          <div className="service-row">
            <div className="service-num">03</div>
            <div><div className="service-name">Full-Stack Web Presence</div><div className="service-desc">MERN/SQL architectures, responsive UI, and CRM integrations. <span className="service-tag">Built with the speed and security of enterprise infrastructure.</span></div></div>
          </div>
          <div className="service-row">
            <div className="service-num">04</div>
            <div><div className="service-name">Data Security &amp; Sovereign Infrastructure</div><div className="service-desc">End-to-end encryption, impenetrable logic layers, zero-leak guarantee. <span className="service-tag">Your IP stays yours.</span></div></div>
          </div>
        </div>
      </section>

      <div className="em-divider" />

      {/* Process */}
      <section>
        <div className="section-tag">The Nurture-Logic Workflow</div>
        <h2 className="section-title">How We Engineer <em>Your Scale</em></h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-num">01</div>
            <div className="step-title">Data Ingestion</div>
            <div className="step-body">Securely collecting firm-specific data. We map your exact operational requirements, workflows, and bottlenecks.</div>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <div className="step-title">Model Training</div>
            <div className="step-body">Custom-refining AI models for zero-error logic. No hallucinations. Precise execution tuned to your domain.</div>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <div className="step-title">Full-Stack Execution</div>
            <div className="step-body">Deploying via MERN/SQL architectures for high-speed, zero-latency performance. Live. Monitored. Optimized.</div>
          </div>
        </div>
      </section>

      <div className="em-divider" />

      {/* CTA */}
      <div className="cta-banner">
        <h2>Stop Losing Capital<br />to <em style={{ fontStyle: 'normal', color: 'var(--em)' }}>Inefficiency.</em></h2>
        <p>One systems audit. Unlimited clarity on where automation can unlock your growth.</p>
        <Link href="/audit"><button className="btn-primary" style={{ fontSize: '1rem', padding: '.9rem 2.5rem' }}>Request a Systems Audit →</button></Link>
      </div>
      <br /><br />

      <div className="em-divider" />
      <Footer />
    </>
  )
}
