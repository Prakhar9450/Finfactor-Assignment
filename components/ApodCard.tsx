"use client";

import Image from "next/image";
import Link from "next/link";
import { ApodResponse } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApodCardProps {
  apod: ApodResponse;
  variant?: "default" | "compact";
}

export default function ApodCard({ apod, variant = "default" }: ApodCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link href={`/apod/${apod.date}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
        {/* Image/Video Thumbnail */}
        <div className={cn(
          "relative overflow-hidden bg-gray-100",
          isCompact ? "h-48" : "h-64"
        )}>
          {apod.media_type === "image" ? (
            <Image
              src={apod.url}
              alt={apod.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
              <Video className="h-16 w-16 text-purple-400" />
              <span className="absolute bottom-2 right-2 text-xs text-purple-600 font-medium">
                Video
              </span>
            </div>
          )}

          {/* Badge overlay */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {apod.media_type === "image" ? (
                <ImageIcon className="mr-1 h-3 w-3" />
              ) : (
                <Video className="mr-1 h-3 w-3" />
              )}
              {apod.media_type}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardHeader className={isCompact ? "p-4" : "p-6"}>
          <CardTitle className={cn(
            "line-clamp-2 group-hover:text-purple-600 transition-colors",
            isCompact ? "text-lg" : "text-xl"
          )}>
            {apod.title}
          </CardTitle>
          <CardDescription className="flex items-center space-x-1 text-xs">
            <Calendar className="h-3 w-3" />
            <span>{new Date(apod.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </CardDescription>
        </CardHeader>

        {!isCompact && (
          <CardContent className="px-6 pb-4">
            <p className="line-clamp-3 text-sm text-gray-600">
              {apod.explanation}
            </p>
          </CardContent>
        )}

        {apod.copyright && (
          <CardFooter className={cn(
            "border-t bg-gray-50",
            isCompact ? "px-4 py-2" : "px-6 py-3"
          )}>
            <p className="text-xs text-gray-500">
              © {apod.copyright}
            </p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}

