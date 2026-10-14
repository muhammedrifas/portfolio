
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function CricketGallery({ galleryImages }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;
  const totalImages = galleryImages.length;

  const closeGallery = () => setActiveIndex(null);

  const showPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + totalImages) % totalImages
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      (current + 1) % totalImages
    );
  };

  // Keyboard navigation while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, totalImages]);

  if (!totalImages) return null;

  return (
    <>
      {/* Gallery preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
        {galleryImages.slice(0, 3).map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View cricket photo ${index + 1}`}
            className={`group relative overflow-hidden rounded-xl text-left ${
              index === 2 ? "hidden sm:block" : ""
            }`}
          >
            <img
              src={src}
              alt={`Cricket Match ${index + 1}`}
              loading="lazy"
              className="w-full h-32 object-cover grayscale
                         group-hover:grayscale-0
                         transition-all duration-500"
            />
          </button>
        ))}
      </div>

      {/* Full-screen lightbox */}
      
{isOpen &&
  createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center
                 bg-black/85 backdrop-blur-xl p-4 sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeGallery();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Cricket photo gallery"
    >
      {/* Close */}
      <button
        type="button"
        onClick={closeGallery}
        aria-label="Close gallery"
        className="absolute top-5 right-5 z-20 rounded-full
                   bg-white/10 text-white w-11 h-11 text-3xl
                   hover:bg-white/20 transition"
      >
        &times;
      </button>

      {/* Previous */}
      {totalImages > 1 && (
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous image"
          className="absolute left-3 sm:left-8 z-20
                     w-11 h-11 rounded-full bg-white/10
                     text-white text-3xl hover:bg-white/20 transition"
        >
          &#8249;
        </button>
      )}

      {/* Image and counter */}
      <div className="flex flex-col items-center justify-center
                      w-full h-full min-w-0 min-h-0">
        <img
          key={activeIndex}
          src={galleryImages[activeIndex]}
          alt={`Cricket Match ${activeIndex + 1}`}
          className="block max-w-full max-h-[82vh] w-auto h-auto
                     object-contain rounded-lg shadow-2xl"
        />

        <p className="mt-4 text-sm text-white/75">
          {activeIndex + 1} / {totalImages}
        </p>
      </div>

      {/* Next */}
      {totalImages > 1 && (
        <button
          type="button"
          onClick={showNext}
          aria-label="Next image"
          className="absolute right-3 sm:right-8 z-20
                     w-11 h-11 rounded-full bg-white/10
                     text-white text-3xl hover:bg-white/20 transition"
        >
          &#8250;
        </button>
      )}
    </div>,
    document.body
  )}

    </>
  );
}

export default CricketGallery;
