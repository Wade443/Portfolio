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

const FILMS = [
  { id: 1, src: 'https://picsum.photos/seed/film1/1280/720', title: 'Into the Wild', category: 'Documentary' },
  { id: 2, src: 'https://picsum.photos/seed/film2/1280/720', title: 'City Pulse', category: 'Short Film' },
  { id: 3, src: 'https://picsum.photos/seed/film3/1280/720', title: 'Drift', category: 'Cinematic' },
  { id: 4, src: 'https://picsum.photos/seed/film4/1280/720', title: 'Echoes', category: 'Music Video' },
  { id: 5, src: 'https://picsum.photos/seed/film5/1280/720', title: 'Still Water', category: 'Documentary' },
  { id: 6, src: 'https://picsum.photos/seed/film6/1280/720', title: 'First Light', category: 'Cinematic' },
]

export default function Gallery() {
  const [tab, setTab] = useState('photos')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const sectionRef = useRef(null)
  const items = tab === 'photos' ? PHOTOS : FILMS

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
  }, [tab])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevItem = () => setLightboxIndex(i => (i - 1 + items.length) % items.length)
  const nextItem = () => setLightboxIndex(i => (i + 1) % items.length)

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="gallery__header reveal">
        <h2 className="section-label">Selected Work</h2>
        <div className="gallery__tabs">
          <button
            className={`gallery__tab${tab === 'photos' ? ' gallery__tab--active' : ''}`}
            onClick={() => setTab('photos')}
          >
            Photography
          </button>
          <button
            className={`gallery__tab${tab === 'films' ? ' gallery__tab--active' : ''}`}
            onClick={() => setTab('films')}
          >
            Film
          </button>
        </div>
      </div>

      {tab === 'photos' ? (
        <div className="gallery__masonry">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className="gallery__item reveal"
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              onClick={() => openLightbox(i)}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-title">{photo.title}</span>
                <span className="gallery__item-cat">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gallery__films">
          {FILMS.map((film, i) => (
            <div
              key={film.id}
              className="gallery__film reveal"
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              onClick={() => openLightbox(i)}
            >
              <img src={film.src} alt={film.title} loading="lazy" />
              <div className="gallery__film-overlay">
                <div className="gallery__play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="gallery__film-info">
                  <span className="gallery__item-cat">{film.category}</span>
                  <span className="gallery__item-title">{film.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  )
}
