// API Route: GET /api/apod/today
// Returns today's Astronomy Picture of the Day

import { NextResponse } from 'next/server';
import { fetchApodToday, formatDate } from '@/lib/nasaClient';
import { apodCache } from '@/lib/cache';
import { ApiResponse, ApodResponse } from '@/lib/types';

export async function GET() {
  try {
    const today = formatDate(new Date());
    const cacheKey = `apod_${today}`;

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
    const apodData = await fetchApodToday();

    // Store in cache
    apodCache.set(cacheKey, apodData);

    const response: ApiResponse<ApodResponse> = {
      success: true,
      data: apodData,
      cached: false,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching today\'s APOD:', error);

    const errorResponse: ApiResponse<ApodResponse> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch APOD',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

