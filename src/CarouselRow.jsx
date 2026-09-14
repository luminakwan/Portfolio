import React, { useEffect, useRef, useState } from 'react';
import ResilientImage from './ResilientImage';

export default function CarouselRow({ folder, images, rowIndex, onPreview }) {
  const element = useRef(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set());
  useEffect(() => {
    const row = element.current;
    if (!('IntersectionObserver' in window)) {
      setActive(true);
      setVisible(true);
      return;
    }
    // Observe the stationary row, not images moving through a transformed track.
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); preload.disconnect(); }
    }, { rootMargin: '350px 0px' });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preload.observe(row);
    visibility.observe(row);
    return () => { preload.disconnect(); visibility.disconnect(); };
  }, []);
  const ready = loaded.size === images.length;
  return <div ref={element} className={`carousel-row ${rowIndex % 2 ? 'reverse' : 'forward'}`} aria-label={folder}>
    <div className="carousel-track" style={{ '--image-count': images.length, animationPlayState: ready && visible ? 'running' : 'paused' }}>
      {[0, 1].map(copy => <div className="carousel-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
        {images.map(({ src, thumbnail, placeholder, name }) => <button type="button" className="carousel-card" key={src}
          style={{ backgroundImage: `url("${placeholder}")` }} tabIndex={copy === 1 ? -1 : 0}
          aria-label={`查看原图：${name}`} onClick={() => onPreview({ src, name })}>
          {active && <ResilientImage src={thumbnail} alt={copy === 0 ? name : ''} draggable="false" width="300" height="190" loading="eager"
            onLoad={() => setLoaded(previous => previous.has(src) ? previous : new Set([...previous, src]))} />}
        </button>)}
      </div>)}
    </div>
  </div>;
}
