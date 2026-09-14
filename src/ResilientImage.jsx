import React, { useEffect, useRef, useState } from 'react';

export default function ResilientImage({ src, loading = 'lazy', ...props }) {
  return <ImageRequest key={src} src={src} loading={loading} {...props} />;
}

function ImageRequest({ src, loading, onLoad, ...props }) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!failed) return;
    const retry = () => {
      clearTimeout(timer.current);
      setFailed(false);
      setAttempt(value => value + 1);
    };
    window.addEventListener('online', retry);
    return () => window.removeEventListener('online', retry);
  }, [failed]);
  // A new URL avoids reusing the browser's cached failed response.
  const request = attempt ? (() => {
    const url = new URL(src, window.location.href);
    url.searchParams.set('image-retry', String(attempt));
    return url.href;
  })() : src;
  return <img {...props} src={request} loading={loading} decoding="async" data-loaded={loaded}
    onLoad={(event) => { clearTimeout(timer.current); setFailed(false); setLoaded(true); onLoad?.(event); }}
    onError={() => {
      clearTimeout(timer.current);
      setFailed(true);
      if (attempt < 2) timer.current = setTimeout(() => {
        setFailed(false);
        setAttempt(value => value + 1);
      }, 1000 * 2 ** attempt);
    }} />;
}
