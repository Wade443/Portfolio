import { useState, useEffect, useRef } from 'react'
import Lightbox from './Lightbox'

const PHOTOS = [
  { id: 1, src: 'https://picsum.photos/seed/photo1/800/1100', title: 'Golden Hour', category: 'Landscape' },
  { id: 2, src: 'https://picsum.photos/seed/photo2/800/600', title: 'Urban Geometry', category: 'Architecture' },
  { id: 3, src: 'https://picsum.photos/seed/photo3/800/900', title: 'Solitude', category: 'Portrait' },
  { id: 4, src: 'https://picsum.photos/seed/photo4/800/650', title: 'Morning Mist', category: 'Landscape' },
  { id: 5, src: 'https://picsum.photos/seed/photo5/800/1000', title: 'Steel & Glass', category: 'Architecture' },
  { id: 6, src: 'https://picsum.photos/seed/photo6/800/700', title: 'Quiet Moment', category: 'Portrait' },
  { id: 7, src: 'https://picsum.photos/seed/photo7/800/850', title: 'Blue Dusk', category: 'Landscape' },
  { id: 8, src: 'https://picsum.photos/seed/photo8/800/600', title: 'Reflections', category: 'Street' },
  { id: 9, src: 'https://picsum.photos/seed/photo9/800/950', title: 'The Wait', category: 'Portrait' },
  { id: 10, src: 'https://picsum.photos/seed/photo10/800/700', title: 'Night City', category: 'Street' },
  { id: 11, src: 'https://picsum.photos/seed/photo11/800/600', title: 'Horizon Line', category: 'Landscape' },
  { id: 12, src: 'https://picsum.photos/seed/photo12/800/800', title: 'Patterns', category: 'Abstract' },
]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="gallery__header reveal">
        <h2 className="section-label">Photography</h2>
      </div>

      <div className="gallery__masonry">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className="gallery__item reveal"
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            onClick={() => setLightboxIndex(i)}
          >
            <img src={photo.src} alt={photo.title} loading="lazy" />
            <div className="gallery__item-overlay">
              <span className="gallery__item-title">{photo.title}</span>
              <span className="gallery__item-cat">{photo.category}</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={PHOTOS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % PHOTOS.length)}
        />
      )}
    </section>
  )
}
