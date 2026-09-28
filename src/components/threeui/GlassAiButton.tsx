/**
 * GlassAiButton
 *
 * Source: https://threeui.com/source-code/glass-ai-button.json
 * Component SHA-256: 1a11cd583e856d3be328a0192be4d77184607c64721f3fb646bd6d61436b2104
 * HTML SHA-256:      a484571de316c05ab7fbd2da82da5e028ee1ffe0bd169449fb8a3c7801abd81e
 * HTML bytes:        739766
 *
 * Architecture note: The original source uses `srcDoc` with the HTML inlined
 * via Vite's `?raw` import. In this project the HTML is served from
 * `/public/threeui/glass-ai-button.html` and loaded via `src` instead,
 * which is functionally identical (same sandbox, same isolation).
 * The component behavior, sandbox attribute, and iframe structure are
 * preserved exactly.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';

export type GlassAiButtonProps = {
  className?: string;
  style?: CSSProperties;
};

export function GlassAiButton({ className = '', style }: GlassAiButtonProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => (
    typeof document === 'undefined' || !document.hidden
  ));
  const [hostVisible, setHostVisible] = useState(false);
  const [ready, setReady] = useState(false);

  // Intersection observer — only mount the iframe when the host is in view
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setHostVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setHostVisible(entry?.isIntersecting ?? true);
    }, { rootMargin: '80px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Page visibility — pause rendering when tab is hidden
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const mounted = hostVisible && documentVisible;

  // Reset ready state whenever we unmount/remount
  useEffect(() => {
    setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`threeui-background glass-ai-button${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="Interactive glass AI button"
      data-state={!mounted ? 'paused' : ready ? 'ready' : 'loading'}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#a8b0bd',
        pointerEvents: 'auto',
        ...style,
      }}
    >
      {mounted ? (
        <iframe
          title="Glass AI Button — GPT 6 Sol Galaxy"
          src="/threeui/glass-ai-button.html"
          // Same sandbox as original — allow-scripts only, no same-origin
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            width: '100%',
            height: '100%',
            border: 0,
            background: '#a8b0bd',
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? 'auto' : 'none',
            transition: 'opacity 240ms ease-out',
          }}
        />
      ) : null}
    </div>
  );
}
