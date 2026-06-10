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
              document.addEventListener('mousemove', e => {
                cur.style.left = e.clientX + 'px';
                cur.style.top = e.clientY + 'px';
                setTimeout(() => {
                  ring.style.left = e.clientX + 'px';
                  ring.style.top = e.clientY + 'px';
                }, 60);
              });
              document.querySelectorAll('button,a,[data-cursor]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                  cur.style.transform = 'translate(-50%,-50%) scale(2)';
                  ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
                });
                el.addEventListener('mouseleave', () => {
                  cur.style.transform = 'translate(-50%,-50%) scale(1)';
                  ring.style.transform = 'translate(-50%,-50%) scale(1)';
                });
              });
              window.addEventListener('scroll', () => {
                const nb = document.getElementById('navbar');
                if(nb) nb.classList.toggle('nav-scrolled', window.scrollY > 60);
              });
            `
          }}
        />
      </body>
    </html>
  )
}
