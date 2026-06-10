import type { Metadata } from 'next'
import Footer from '../Footer'

export const metadata: Metadata = {
  title: 'Impact Lab — DigiNurture',
  description: 'Real deployments. Real outcomes. Proven logic and measurable growth across AgriTech and Legal verticals.',
}

export default function Impact() {
  return (
    <>
      <section style={{ paddingTop: '7rem' }}>
        <div className="section-tag">The Impact Laboratory</div>
        <h2 className="section-title">Proven Logic. <em>Measurable Growth.</em></h2>
        <p className="section-body">Real deployments. Real outcomes. Each case study represents a system engineered from first principles.</p>
        <div className="grid-2" style={{ marginTop: '3rem' }}>
          <div className="case-card">
            <div className="case-header">
              <div className="case-tag">AgriTech · Recommendation Engine</div>
              <div className="case-title">Automated Agronomic Advisory System</div>
              <div className="case-sub">Enterprise AgriTech · Farmer Decision Support</div>
            </div>
            <div className="case-body">
              <div className="case-stat">
                <div><div className="metric-val">90%</div><div className="metric-lbl">Inquiry Automation</div></div>
                <div><div className="metric-val">0ms</div><div className="metric-lbl">Response Target</div></div>
                <div><div className="metric-val">∞</div><div className="metric-lbl">Scalability</div></div>
              </div>
              <p className="case-desc"><em style={{ color: 'var(--em)', fontStyle: 'normal' }}>Vibecoded.</em> Automated 90% of technical farmer inquiries via custom AI without compromising agronomic accuracy. Deep, localized insights delivered in real-time.</p>
            </div>
          </div>
          <div className="case-card">
            <div className="case-header">
              <div className="case-tag">Legal &amp; Real Estate · AI Intake</div>
              <div className="case-title">Zero-Drop Lead Capture Pipeline</div>
              <div className="case-sub">Law Firm + Real Estate Agency · 24/7 Intake</div>
            </div>
            <div className="case-body">
              <div className="case-stat">
                <div><div className="metric-val">24/7</div><div className="metric-lbl">Active Coverage</div></div>
                <div><div className="metric-val">$10k+</div><div className="metric-lbl">Avg. Lead Value</div></div>
                <div><div className="metric-val">0</div><div className="metric-lbl">Dropped Leads</div></div>
              </div>
              <p className="case-desc"><em style={{ color: 'var(--em)', fontStyle: 'normal' }}>Zero-Drop Funnel.</em> Automated 24/7 Lead Intake &amp; Appointment Scheduling, recapturing thousands in previously lost revenue from after-hours inquiries.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="em-divider" />
      <Footer />
    </>
  )
}
