import { useEffect, useCallback } from 'react'

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        &#x2715;
      </button>

      <button
        className="lightbox__arrow lightbox__arrow--prev"
        onClick={e => { e.stopPropagation(); onPrev() }}
        aria-label="Previous"
      >
        &#8592;
      </button>

      <div className="lightbox__media" onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <p className="lightbox__caption">{item.title}</p>
      </div>

      <button
        className="lightbox__arrow lightbox__arrow--next"
        onClick={e => { e.stopPropagation(); onNext() }}
        aria-label="Next"
      >
        &#8594;
      </button>

      <div className="lightbox__counter">
        {index + 1} / {items.length}
      </div>
    </div>
  )
}
