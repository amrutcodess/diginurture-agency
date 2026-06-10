import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">Digi<span>Nurture</span></div>
          <p className="footer-desc">Engineering the technical infrastructure for 2026's market leaders. From AgriTech to Legal — precision automation at scale.</p>
        </div>
        <div className="footer-col">
          <h4>Solutions</h4>
          <Link href="/agritech">AgriTech &amp; Enterprise</Link>
          <Link href="/legal">Legal &amp; Real Estate</Link>
          <Link href="/impact">Impact Laboratory</Link>
          <Link href="/workflow">Nurture-Logic</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/audit">Request Audit</Link>
          <a>Data Security</a>
          <a>About</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 DigiNurture. All rights reserved.</span>
        <span className="footer-em">// Built with Nurture-Logic™</span>
      </div>
    </footer>
  )
}
