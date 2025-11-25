"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApodDetailSkeleton } from "@/components/LoadingSkeleton";
import { ApiResponse, ApodResponse } from "@/lib/types";
import { formatDate } from "@/lib/nasaClient";
import Image from "next/image";
import { Calendar as CalendarIcon, Download, Copyright } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BrowsePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setDate(selectedDate);
    setLoading(true);
    setError(null);

    try {
      const dateString = formatDate(selectedDate);
      const res = await fetch(`/api/apod/date?date=${dateString}`);
      const data: ApiResponse<ApodResponse> = await res.json();

      if (data.success && data.data) {
        setApod(data.data);
      } else {
        setError(data.error || "Failed to fetch APOD");
      }
    } catch (err) {
      setError("An error occurred while fetching APOD");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse APOD by Date</h1>
        <p className="text-gray-600">Select any date to view the Astronomy Picture of the Day</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select a Date</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date() || date < new Date("1995-06-16")}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="mt-4 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> NASA APOD started on June 16, 1995. Select any date from then until today.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* APOD Display Section */}
        <div className="lg:col-span-2">
          {loading && <ApodDetailSkeleton />}

          {error && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <p className="text-red-800">{error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && apod && (
            <Card className="overflow-hidden shadow-xl">
              {/* Image/Video Section */}
              <div className="relative h-[300px] md:h-[500px] bg-gray-100">
                {apod.media_type === "image" ? (
                  <Image
                    src={apod.url}
                    alt={apod.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                ) : (
                  <div className="h-full w-full">
                    <iframe
                      src={apod.url}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl">{apod.title}</CardTitle>
                  <Badge variant="secondary">{apod.media_type}</Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {new Date(apod.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {apod.copyright && (
                    <div className="flex items-center gap-1">
                      <Copyright className="h-4 w-4" />
                      <span>{apod.copyright}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{apod.explanation}</p>
                </div>

                {apod.hdurl && (
                  <div className="pt-4">
                    <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download HD Image
                      </Button>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!loading && !error && !apod && (
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6 text-center">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <p className="text-purple-800">Select a date from the calendar to view the APOD</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

