import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const SLIDE_INTERVAL_MS = 4000;
// Every carousel derives its active slide from the same module-level epoch.
// This prevents independent setIntervals from drifting apart over time.
const SLIDER_EPOCH = Date.now();

function getSynchronizedIndex(imageCount) {
  const elapsed = Date.now() - SLIDER_EPOCH;
  return Math.floor(elapsed / SLIDE_INTERVAL_MS) % imageCount;
}

function getTimeUntilNextTick() {
  const elapsed = Date.now() - SLIDER_EPOCH;
  const remainder = elapsed % SLIDE_INTERVAL_MS;
  return remainder === 0 ? SLIDE_INTERVAL_MS : SLIDE_INTERVAL_MS - remainder;
}

export default function ProjectMediaCarousel({ images, projectName }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (images.length < 2 || paused || interacting || reducedMotion) return undefined;

    // Rejoin the shared position immediately after hover/focus/pause ends.
    const synchronize = () => setActive(getSynchronizedIndex(images.length));
    synchronize();

    let intervalId;
    const timeoutId = window.setTimeout(() => {
      synchronize();
      intervalId = window.setInterval(synchronize, SLIDE_INTERVAL_MS);
    }, getTimeUntilNextTick());

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [images.length, paused, interacting, reducedMotion]);

  if (!images.length) return null;

  return (
    <div
      className="pc-slider"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
      aria-label={`${projectName} project visuals`}
    >
      <div className="pc-slides">
        {images.map((image, index) => (
          <img
            key={image.src}
            className={`pc-slide ${index === active ? 'is-active' : ''}`}
            src={image.src}
            alt={index === active ? image.alt : ''}
            aria-hidden={index !== active}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="pc-slider-controls">
          <div className="pc-slider-dots" aria-label="Choose project visual">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === active ? 'true' : undefined}
              />
            ))}
          </div>
          {!reducedMotion && (
            <button type="button" className="pc-slider-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play project image slider' : 'Pause project image slider'}>
              {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
