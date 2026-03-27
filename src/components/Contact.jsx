import { useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.2 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact__inner">
        <h2 className="section-label reveal">Contact</h2>
        <p className="contact__heading reveal reveal-delay-1">
          Let's make something<br />worth remembering.
        </p>
        <a
          href="mailto:hello@wade.photo"
          className="contact__email reveal reveal-delay-2"
        >
          hello@wade.photo
        </a>

        <div className="contact__divider reveal reveal-delay-3" />

        <div className="contact__socials reveal reveal-delay-4">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Vimeo">Vimeo</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Wade. All rights reserved.</p>
      </footer>
    </section>
  )
}
