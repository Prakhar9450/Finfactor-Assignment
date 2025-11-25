// API Route: GET /api/apod/range?start=YYYY-MM-DD&end=YYYY-MM-DD
// Returns APOD entries for a date range

import { NextRequest, NextResponse } from 'next/server';
import { fetchApodRange, isValidDateString } from '@/lib/nasaClient';
import { apodCache } from '@/lib/cache';
import { ApiResponse, ApodResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    // Validate parameters
    if (!startDate || !endDate) {
      const errorResponse: ApiResponse<ApodResponse[]> = {
        success: false,
        error: 'Both start and end date parameters are required (format: YYYY-MM-DD)',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!isValidDateString(startDate) || !isValidDateString(endDate)) {
      const errorResponse: ApiResponse<ApodResponse[]> = {
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate date range
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      const errorResponse: ApiResponse<ApodResponse[]> = {
        success: false,
        error: 'Start date must be before or equal to end date',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Limit range to prevent abuse (max 100 days)
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 100) {
      const errorResponse: ApiResponse<ApodResponse[]> = {
        success: false,
        error: 'Date range cannot exceed 100 days',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const cacheKey = `apod_range_${startDate}_${endDate}`;

    // Check cache first
    const cachedData = apodCache.get(cacheKey);
    if (cachedData) {
      const response: ApiResponse<ApodResponse[]> = {
        success: true,
        data: cachedData,
        cached: true,
      };
      return NextResponse.json(response);
    }

    // Fetch from NASA API
    const apodData = await fetchApodRange(startDate, endDate);

    // Store in cache
    apodCache.set(cacheKey, apodData);

    const response: ApiResponse<ApodResponse[]> = {
      success: true,
      data: apodData,
      cached: false,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching APOD range:', error);

    const errorResponse: ApiResponse<ApodResponse[]> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch APOD range',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

