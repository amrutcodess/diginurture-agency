import type { Metadata } from 'next'
import Footer from '../Footer'

export const metadata: Metadata = {
  title: 'Nurture-Logic Process — DigiNurture',
  description: 'A three-phase engineering framework. Every client engagement follows this precision sequence including the Zero-Leak security guarantee.',
}

export default function Workflow() {
  return (
    <>
      <section style={{ paddingTop: '7rem' }}>
        <div className="section-tag">Platform &amp; Process</div>
        <h2 className="section-title">The <em>Nurture-Logic™</em> Workflow</h2>
        <p className="section-body">A three-phase engineering framework. Every client engagement follows this precision sequence.</p>
        <div className="process-steps" style={{ marginTop: '3rem' }}>
          <div className="process-step">
            <div className="step-num">01</div>
            <div className="step-title">Data Ingestion</div>
            <div className="step-body">Secure collection of firm-specific operational data. We map workflows, identify bottlenecks, and define success metrics with surgical precision.</div>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <div className="step-title">Model Training</div>
            <div className="step-body">Custom-refining AI models for zero-error, domain-specific logic. No hallucinations. No generic outputs. Just precise execution trained on your reality.</div>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <div className="step-title">Full-Stack Execution</div>
            <div className="step-body">Deployment via MERN/SQL architectures. High-speed, zero-latency, production-grade. Monitored, optimized, and scaled with your growth.</div>
          </div>
        </div>

        <div className="em-divider" style={{ margin: '3rem 0' }} />

        <div className="section-tag">Security Guarantee</div>
        <h2 className="section-title">The <em>&quot;Zero-Leak&quot;</em> Guarantee.</h2>
        <p className="section-body">We treat client data with the exact same precision used in our enterprise AgriTech recommendation systems.</p>
        <div className="security-grid">
          <div className="sec-item"><div className="sec-icon">🔐</div><div><div className="sec-title">End-to-End Encryption</div><div className="sec-body">All data in transit and at rest is encrypted using industry-standard protocols.</div></div></div>
          <div className="sec-item"><div className="sec-icon">🛡️</div><div><div className="sec-title">Impenetrable Logic Layers</div><div className="sec-body">Multi-layer access control and audit trails on every data operation.</div></div></div>
          <div className="sec-item"><div className="sec-icon">🏛️</div><div><div className="sec-title">Sovereign Data Handling</div><div className="sec-body">Your IP stays yours. No data sharing, no training on client data without consent.</div></div></div>
          <div className="sec-item"><div className="sec-icon">⚡</div><div><div className="sec-title">Zero-Latency Architecture</div><div className="sec-body">MERN/SQL infrastructure engineered for sub-100ms response on all production systems.</div></div></div>
        </div>
      </section>
      <div className="em-divider" />
      <Footer />
    </>
  )
}
