import { useEffect, useRef } from 'react'

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    // Slight parallax on scroll
    const onScroll = () => {
      if (titleRef.current) {
        const y = window.scrollY
        titleRef.current.style.transform = `translateY(${y * 0.3}px)`
        titleRef.current.style.opacity = 1 - y / 600
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToGallery = () => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img
          src="https://picsum.photos/seed/hero/1920/1080"
          alt=""
          className="hero__image"
        />
        <div className="hero__overlay" />
        <div className="hero__grain" />
      </div>

      <div className="hero__content" ref={titleRef}>
        <p className="hero__eyebrow">Portfolio</p>
        <h1 className="hero__title">WADE</h1>
        <p className="hero__subtitle">Photography &middot; Film</p>
      </div>

      <button className="hero__scroll" onClick={scrollToGallery} aria-label="Scroll to work">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </button>
    </section>
  )
}
