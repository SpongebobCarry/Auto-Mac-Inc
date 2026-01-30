'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarImageGalleryProps {
  images: string[];
  alt: string;
}

export default function CarImageGallery({ images, alt }: CarImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl mb-4">
        <Image
          src={images[currentImageIndex]}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
          className="object-cover transition-opacity duration-300 ease-in-out"
          priority={currentImageIndex === 0}
          data-ai-hint="car vehicle"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    currentImageIndex === index ? "bg-white w-4" : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((imgSrc, index) => (
            <button key={index} onClick={() => setCurrentImageIndex(index)} className={cn("relative aspect-video overflow-hidden rounded-md border-2 transition-all", currentImageIndex === index ? "border-primary" : "border-transparent hover:border-primary/50")}>
              <Image
                src={imgSrc}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                sizes="10vw"
                className="object-cover"
                data-ai-hint="car detail"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
