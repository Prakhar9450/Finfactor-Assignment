// API Route: GET /api/apod/date?date=YYYY-MM-DD
// Returns APOD for a specific date

import { NextRequest, NextResponse } from "next/server";
import { fetchApodByDate, isValidDateString } from "@/lib/nasaClient";
import { apodCache } from "@/lib/cache";
import { ApiResponse, ApodResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");

    // Validate date parameter
    if (!date) {
      const errorResponse: ApiResponse<ApodResponse> = {
        success: false,
        error: "Date parameter is required (format: YYYY-MM-DD)",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!isValidDateString(date)) {
      const errorResponse: ApiResponse<ApodResponse> = {
        success: false,
        error: "Invalid date format. Use YYYY-MM-DD",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Check if date is in the future
    const requestedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (requestedDate > today) {
      const errorResponse: ApiResponse<ApodResponse> = {
        success: false,
        error: "Date cannot be in the future",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const cacheKey = `apod_${date}`;

    // Check cache first
    const cachedData = apodCache.get(cacheKey);
    if (cachedData) {
      const response: ApiResponse<ApodResponse> = {
        success: true,
        data: cachedData,
        cached: true,
      };
      return NextResponse.json(response);
    }

    // Fetch from NASA API
    const apodData = await fetchApodByDate(date);

    // Store in cache
    apodCache.set(cacheKey, apodData);

    const response: ApiResponse<ApodResponse> = {
      success: true,
      data: apodData,
      cached: false,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching APOD by date:", error);

    const errorResponse: ApiResponse<ApodResponse> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch APOD",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
