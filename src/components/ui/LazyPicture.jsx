import { useEffect, useRef, useState } from "react";

export function LazyPicture({
  sources = [],
  src,
  alt = "",
  width,
  height,
  className = "",
  imgClassName = "",
  variant = "portrait",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}) {
  const imgRef = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState("");
  const isLoaded = loadedSrc === src;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      const frame = requestAnimationFrame(() => setLoadedSrc(src));
      return () => cancelAnimationFrame(frame);
    }
  }, [src]);

  const handleDone = () => {
    setLoadedSrc(src);
  };

  return (
    <picture
      className={`lazy-picture lazy-picture--${variant} ${className}`.trim()}
      data-loaded={isLoaded ? "true" : "false"}
    >
      {sources.map((source) => (
        <source
          key={`${source.type}-${source.srcSet}`}
          type={source.type}
          srcSet={source.srcSet}
          sizes={source.sizes}
        />
      ))}
      <img
        ref={imgRef}
        className={imgClassName || undefined}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={handleDone}
        onError={handleDone}
      />
    </picture>
  );
}
