'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type FormData = {
  name: string
  company: string
  email: string
  industry: string
  bottleneck: string
  lead_volume: string
  tech_stack: string
  primary_goal: string
  notes: string
}

const initial: FormData = {
  name: '', company: '', email: '', industry: '',
  bottleneck: '', lead_volume: 'Under 50', tech_stack: '',
  primary_goal: 'Automate lead intake & qualification', notes: '',
}

export default function AuditPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initial)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (k: keyof FormData, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  function nextStep() {
    if (step === 1) {
      if (!form.name || !form.email || !form.industry || !form.company) {
        setError('Please fill all required fields.')
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError('Please enter a valid email address.')
        return
      }
    }
    setError('')
    setStep(s => s + 1)
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')
    try {
      const { error: dbErr } = await supabase.from('audit_requests').insert([form])
      if (dbErr) throw dbErr
      setSuccess(true)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Submission failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section style={{ paddingTop: '7rem' }}>
        <div className="audit-wrap">
          <div className="form-success">
            <div className="success-icon">✅</div>
            <h3>Audit Request Received.</h3>
            <p>
              Our engineering team will analyze your submission and reach out within{' '}
              <strong style={{ color: 'var(--white)' }}>24 hours</strong> with deep technical insights — at no commitment.
              <br /><br />
              <span style={{ color: 'var(--em)', fontFamily: 'var(--font-mono)', fontSize: '.85rem' }}>
                // Nurture-Logic™ is now processing your brief.
              </span>
            </p>
            <button className="btn-ghost" style={{ marginTop: '2rem' }} onClick={() => router.push('/')}>
              ← Back to Home
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={{ paddingTop: '7rem' }}>
      <div className="section-tag">Conversion Action</div>
      <h2 className="section-title" style={{ marginBottom: '3rem' }}>
        Request a <em>Systems Audit</em>
      </h2>
      <div className="audit-wrap">
        {/* Progress bar */}
        <div className="form-steps-bar">
          {[1, 2, 3].map(n => (
            <div
              key={n}
              className={`fstep${step > n ? ' done' : step === n ? ' active' : ''}`}
            />
          ))}
        </div>

        {error && <p className="form-error" style={{ marginBottom: '1rem' }}>⚠ {error}</p>}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="form-step-title">About Your Business</div>
            <div className="form-step-sub">Tell us who you are and what industry you operate in.</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" placeholder="Rajesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input className="form-input" placeholder="Acme Corp" value={form.company} onChange={e => set('company', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Industry *</label>
              <select className="form-select" value={form.industry} onChange={e => set('industry', e.target.value)}>
                <option value="">Select your industry...</option>
                <option>AgriTech / Agriculture</option>
                <option>Legal Services</option>
                <option>Real Estate</option>
                <option>High-Growth Local Business</option>
                <option>Enterprise / Other</option>
              </select>
            </div>
            <div className="form-nav">
              <div />
              <button className="btn-primary" onClick={nextStep}>Next: Operations →</button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div className="form-step-title">Current Operations</div>
            <div className="form-step-sub">Help us understand where automation can unlock your growth.</div>
            <div className="form-group">
              <label className="form-label">Biggest operational bottleneck?</label>
              <select className="form-select" value={form.bottleneck} onChange={e => set('bottleneck', e.target.value)}>
                <option value="">Select...</option>
                <option>Lead qualification &amp; intake</option>
                <option>Appointment scheduling</option>
                <option>Technical advisory &amp; support</option>
                <option>Data processing &amp; reporting</option>
                <option>Customer follow-up &amp; nurturing</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Monthly leads / inquiries volume?</label>
              <select className="form-select" value={form.lead_volume} onChange={e => set('lead_volume', e.target.value)}>
                <option>Under 50</option>
                <option>50–200</option>
                <option>200–1000</option>
                <option>1000+</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Current tech stack (if any)</label>
              <input className="form-input" placeholder="e.g. WordPress, Salesforce, custom CRM..." value={form.tech_stack} onChange={e => set('tech_stack', e.target.value)} />
            </div>
            <div className="form-nav">
              <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" onClick={nextStep}>Next: Goals →</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <div className="form-step-title">Your Growth Goals</div>
            <div className="form-step-sub">What does success look like for you?</div>
            <div className="form-group">
              <label className="form-label">What&apos;s your primary goal? *</label>
              <select className="form-select" value={form.primary_goal} onChange={e => set('primary_goal', e.target.value)}>
                <option>Automate lead intake &amp; qualification</option>
                <option>Build custom AI recommendation system</option>
                <option>Full-stack web presence &amp; CRM</option>
                <option>Data security &amp; infrastructure audit</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Anything else we should know?</label>
              <textarea className="form-textarea" placeholder="Describe your situation, timeline, or any specific requirements..." value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
            <div className="form-nav">
              <button className="btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? '⏳ Submitting...' : 'Submit — Get My Audit →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
