import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../Footer'

export const metadata: Metadata = {
  title: 'Legal & Real Estate — DigiNurture',
  description: 'High-stakes lead triage for elite firms. 24/7 AI automated receptionist that qualifies, routes, and secures high-value clients.',
}

export default function Legal() {
  return (
    <>
      <section className="hero hero-short">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="orb orb1" />
        <div className="hero-content">
          <div className="hero-badge">◉ Industry Solution — Legal &amp; Real Estate</div>
          <h1>High-Stakes Lead Triage<br />for <em>Elite Firms.</em></h1>
          <p className="hero-sub">While your competitors sleep, your AI automated receptionist qualifies, routes, and secures high-value clients around the clock.</p>
          <Link href="/audit"><button className="btn-primary">Deploy Your Intake System</button></Link>
        </div>
      </section>

      <div className="em-divider" />

      <section>
        <div className="section-tag">The Challenge</div>
        <h2 className="section-title">The <em>Speed-to-Lead</em> Disadvantage.</h2>
        <div className="grid-asym">
          <div>
            <p className="section-body">A missed call at 8 PM is a $10k case lost forever. We deploy custom MERN/AI infrastructures that turn passive digital presence into aggressive, 24/7 lead capture machines.</p>
            <div className="glass-card" style={{ marginTop: '2rem' }}>
              <div className="card-em" style={{ fontSize: '.9rem', color: 'var(--em2)' }}>✦ Feature Highlight</div>
              <p style={{ color: 'var(--slate2)', marginTop: '.8rem', lineHeight: '1.8' }}>
                Our AI Intake models interact logically, <strong style={{ color: 'var(--white)' }}>pre-qualifying prospects</strong> based on your unique criteria, setting appointments directly into your CRM. <strong style={{ color: 'var(--em)' }}>You arrive at the office with a booked calendar.</strong>
              </p>
            </div>
          </div>
          <div className="grid-3" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
            <div className="glass-card"><div className="card-icon">⚖️</div><div className="card-title">Zero-Drop Intake</div><div className="card-body">Every inbound lead captured, classified, and routed — regardless of time or channel.</div></div>
            <div className="glass-card"><div className="card-icon">📅</div><div className="card-title">Autonomous Scheduling</div><div className="card-body">Direct CRM integration. Appointments set without human coordination. Zero scheduling friction.</div></div>
            <div className="glass-card"><div className="card-icon">💰</div><div className="card-title">Revenue Recovery</div><div className="card-body">Recapture thousands in previously lost revenue from after-hours and overflow inquiries.</div></div>
          </div>
        </div>
      </section>

      <div className="em-divider" />
      <Footer />
    </>
  )
}
