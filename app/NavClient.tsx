'use client'
import { usePathname, useRouter } from 'next/navigation'

export default function NavClient() {
  const router = useRouter()
  const path = usePathname()

  const links = [
    { label: 'Home', href: '/' },
    { label: 'AgriTech', href: '/agritech' },
    { label: 'Legal & RE', href: '/legal' },
    { label: 'Impact Lab', href: '/impact' },
    { label: 'Process', href: '/workflow' },
  ]

  return (
    <nav id="navbar">
      <button className="nav-logo" onClick={() => router.push('/')}>
        Digi<span>Nurture</span>
      </button>
      <div className="nav-links">
        {links.map(l => (
          <button
            key={l.href}
            className={`nav-link${path === l.href ? ' active' : ''}`}
            onClick={() => router.push(l.href)}
          >
            {l.label}
          </button>
        ))}
        <button className="nav-cta" onClick={() => router.push('/audit')}>
          Request Audit →
        </button>
      </div>
    </nav>
  )
}
