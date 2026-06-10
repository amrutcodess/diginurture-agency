'use client'
import { useEffect, useState } from 'react'
import { supabase, AuditRequest } from '@/lib/supabase'

const ADMIN_PASSWORD = 'diginurture2026'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [rows, setRows] = useState<AuditRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')

  function login() {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    supabase
      .from('audit_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }: any) => {
        if (error) setFetchError(error.message)
        else setRows(data as AuditRequest[])
        setLoading(false)
      })
  }, [authed])

  if (!authed) {
    return (
      <div className="admin-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div className="admin-lock">
          <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🔐</div>
          <h2>Admin Access</h2>
          <p>Enter the password to view audit submissions.</p>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              autoFocus
            />
            {pwError && <div className="form-error">Incorrect password.</div>}
          </div>
          <button className="btn-primary" style={{ width:'100%' }} onClick={login}>
            Unlock Dashboard →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-wrap">
      <h1 className="admin-title">Audit <em>Submissions</em></h1>
      <p className="admin-meta">
        // {rows.length} submission{rows.length !== 1 ? 's' : ''} · sorted by newest first
      </p>

      {loading && <p style={{ color: 'var(--slate)', fontFamily: 'var(--font-mono)' }}>⏳ Loading submissions...</p>}
      {fetchError && <p className="form-error">Error: {fetchError}</p>}

      {!loading && rows.length === 0 && !fetchError && (
        <div className="admin-empty">
          <span>📭</span>
          <p>No submissions yet. Share the site and wait for your first lead!</p>
        </div>
      )}

      {rows.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Industry</th>
                <th>Bottleneck</th>
                <th>Volume</th>
                <th>Goal</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                  </td>
                  <td><strong style={{ color: 'var(--white)' }}>{r.name}</strong></td>
                  <td>{r.company}</td>
                  <td>
                    <a href={`mailto:${r.email}`} style={{ color: 'var(--em)', textDecoration:'none' }}>{r.email}</a>
                  </td>
                  <td><span className="admin-badge">{r.industry}</span></td>
                  <td style={{ maxWidth:'160px' }}>{r.bottleneck || '—'}</td>
                  <td>{r.lead_volume}</td>
                  <td style={{ maxWidth:'160px' }}>{r.primary_goal}</td>
                  <td style={{ maxWidth:'200px', color:'var(--slate)', fontSize:'.8rem' }}>{r.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
