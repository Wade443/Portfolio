import { useState, useEffect, useRef } from 'react'

const VIDEOS = [
  { id: 1, thumbnail: 'https://picsum.photos/seed/vid1/1280/720', title: 'Into the Wild', category: 'Documentary', youtubeId: null },
  { id: 2, thumbnail: 'https://picsum.photos/seed/vid2/1280/720', title: 'City Pulse', category: 'Short Film', youtubeId: null },
  { id: 3, thumbnail: 'https://picsum.photos/seed/vid3/1280/720', title: 'Drift', category: 'Cinematic', youtubeId: null },
  { id: 4, thumbnail: 'https://picsum.photos/seed/vid4/1280/720', title: 'Echoes', category: 'Music Video', youtubeId: null },
  { id: 5, thumbnail: 'https://picsum.photos/seed/vid5/1280/720', title: 'Still Water', category: 'Documentary', youtubeId: null },
  { id: 6, thumbnail: 'https://picsum.photos/seed/vid6/1280/720', title: 'First Light', category: 'Cinematic', youtubeId: null },
]

function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="video-lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">&#x2715;</button>
      <div className="video-lightbox__media" onClick={e => e.stopPropagation()}>
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-lightbox__placeholder">
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-lightbox__coming-soon">
              <span className="video-lightbox__label">{video.category}</span>
              <p className="video-lightbox__title">{video.title}</p>
              <p className="video-lightbox__note">Video coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null)
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
    <section className="videos" id="videos" ref={sectionRef}>
      <div className="videos__header reveal">
        <p className="videos__eyebrow">Portfolio</p>
        <h1 className="videos__title">WADE</h1>
        <p className="videos__subtitle">Film &middot; Photography</p>
      </div>

      <div className="videos__grid">
        {VIDEOS.map((video, i) => (
          <div
            key={video.id}
            className="videos__item reveal"
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            onClick={() => setActiveVideo(video)}
          >
            <img src={video.thumbnail} alt={video.title} loading="lazy" />
            <div className="videos__overlay">
              <div className="videos__play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="videos__info">
                <span className="videos__cat">{video.category}</span>
                <span className="videos__name">{video.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  )
}
