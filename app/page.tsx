// Dashboard Page - Today's APOD
import { Suspense } from "react";
import { ApodDetailSkeleton } from "@/components/LoadingSkeleton";
import TodayApod from "./TodayApod";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Astronomy Picture of the Day
        </h1>
        <p className="text-gray-600">
          Discover the cosmos! Each day a different image or photograph of our fascinating universe.
        </p>
      </div>

      <Suspense fallback={<ApodDetailSkeleton />}>
        <TodayApod />
      </Suspense>
    </div>
  );
}

