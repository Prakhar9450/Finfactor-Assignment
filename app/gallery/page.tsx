// Gallery Page - Display recent APODs
import { Suspense } from "react";
import { ApodCardSkeleton } from "@/components/LoadingSkeleton";
import GalleryContent from "./GalleryContent";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">APOD Gallery</h1>
        <p className="text-gray-600">
          Explore the last 20 days of cosmic wonders
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ApodCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <GalleryContent />
      </Suspense>
    </div>
  );
}

