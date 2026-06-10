import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../Footer'

export const metadata: Metadata = {
  title: 'AgriTech & Enterprise — DigiNurture',
  description: 'Precision automation for the future of agriculture. Custom AI recommendation engines and automated advisory tools.',
}

export default function AgriTech() {
  return (
    <>
      <section className="hero hero-short">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="orb orb1" style={{ background: 'rgba(16,185,129,.09)' }} />
        <div className="hero-content">
          <div className="hero-badge">◉ Industry Solution — AgriTech &amp; Enterprise</div>
          <h1>Precision Automation for the <em>Future of Agriculture.</em></h1>
          <p className="hero-sub">Empower your data. We engineer complex recommendation systems and automated advisory tools that scale farm-level expertise globally.</p>
          <Link href="/audit"><button className="btn-primary">Request a Technical Audit</button></Link>
        </div>
      </section>

      <div className="em-divider" />

      <section>
        <div className="section-tag">The Challenge</div>
        <h2 className="section-title">The Information <em>Bottleneck.</em></h2>
        <div className="grid-asym">
          <div>
            <p className="section-body">Agronomists and technical teams are overwhelmed. We build the decision engines that instantly synthesize soil data, crop history, and situational variables to deliver real-time, zero-error support to farmers at scale.</p>
            <div className="glass-card" style={{ marginTop: '2rem' }}>
              <div className="card-em" style={{ fontSize: '.9rem', color: 'var(--em2)' }}>✦ Feature Highlight</div>
              <p style={{ color: 'var(--slate2)', marginTop: '.8rem', lineHeight: '1.8' }}>
                Automated <strong style={{ color: 'var(--white)' }}>90% of technical farmer inquiries</strong> via custom AI, returning deep, localized agronomic insights in seconds — without compromising accuracy.
              </p>
            </div>
          </div>
          <div className="grid-3" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
            <div className="glass-card"><div className="card-icon">🌾</div><div className="card-title">Soil Data Synthesis</div><div className="card-body">Real-time processing of soil composition, moisture, and nutrient data for hyper-local recommendations.</div></div>
            <div className="glass-card"><div className="card-icon">📊</div><div className="card-title">Crop History Models</div><div className="card-body">Historical yield analysis fed into predictive models for optimal planting and intervention cycles.</div></div>
            <div className="glass-card"><div className="card-icon">🛰️</div><div className="card-title">Scalable Advisory</div><div className="card-body">One expert&apos;s knowledge. Infinite reach. Deployed via API to serve thousands of farmers simultaneously.</div></div>
          </div>
        </div>
      </section>

      <div className="em-divider" />
      <Footer />
    </>
  )
}
