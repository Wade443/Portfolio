import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.15 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__inner">
        <div className="about__text">
          <h2 className="section-label reveal">About</h2>
          <h3 className="about__heading reveal reveal-delay-1">
            Visual storyteller<br />based on Earth.
          </h3>
          <p className="about__body reveal reveal-delay-2">
            I'm Wade — a photographer and filmmaker drawn to the quiet tension between
            light and shadow. My work spans landscapes, portraiture, and cinematic short
            film, always chasing that single frame where everything clicks into place.
          </p>
          <p className="about__body reveal reveal-delay-3">
            Whether I'm shooting on a misty hillside at dawn or directing a commercial
            production, I bring the same obsessive attention to composition, mood, and
            the human element that makes an image resonate long after you've looked away.
          </p>
          <a href="#contact" className="about__cta reveal reveal-delay-4">
            Work with me <span>&#8594;</span>
          </a>
        </div>

        <div className="about__image reveal reveal-delay-2">
          <img
            src="https://picsum.photos/seed/portrait/600/800"
            alt="Wade — photographer and filmmaker"
          />
          <div className="about__image-accent" />
        </div>
      </div>
    </section>
  )
}
