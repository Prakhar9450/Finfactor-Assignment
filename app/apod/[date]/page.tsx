// Dynamic APOD Detail Page
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Download, Copyright, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiResponse, ApodResponse } from "@/lib/types";
import { isValidDateString } from "@/lib/nasaClient";

interface PageProps {
  params: {
    date: string;
  };
}

async function getApodByDate(date: string): Promise<ApodResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/apod/date?date=${date}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch APOD");
  }

  const data: ApiResponse<ApodResponse> = await res.json();

  if (!data.success || !data.data) {
    throw new Error(data.error || "Failed to fetch APOD");
  }

  return data.data;
}

export default async function ApodDetailPage({ params }: PageProps) {
  // Validate date format
  if (!isValidDateString(params.date)) {
    notFound();
  }

  let apod: ApodResponse;

  try {
    apod = await getApodByDate(params.date);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/gallery">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>
      </div>

      {/* APOD Detail Card */}
      <div className="max-w-5xl mx-auto">
        <Card className="overflow-hidden shadow-xl">
          {/* Image/Video Section */}
          <div className="relative h-[400px] md:h-[600px] bg-gray-100">
            {apod.media_type === "image" ? (
              <Image
                src={apod.url}
                alt={apod.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
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
              <CardTitle className="text-3xl">{apod.title}</CardTitle>
              <Badge variant="secondary" className="shrink-0">
                {apod.media_type}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
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
              <p className="text-gray-700 leading-relaxed text-lg">
                {apod.explanation}
              </p>
            </div>

            {apod.hdurl && (
              <div className="pt-4 flex gap-3">
                <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Download HD Image
                  </Button>
                </a>
                <a href={apod.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    View Full Size
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

