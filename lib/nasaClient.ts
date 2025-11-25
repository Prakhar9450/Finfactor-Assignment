// NASA APOD API Client

import { ApodResponse } from "./types";

const NASA_APOD_BASE_URL = "https://api.nasa.gov/planetary/apod";

function getApiKey(): string {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    throw new Error("NASA_API_KEY environment variable is not set");
  }
  return apiKey;
}

/**
 * Fetch APOD for a specific date
 */
export async function fetchApodByDate(date: string): Promise<ApodResponse> {
  const apiKey = getApiKey();
  const url = `${NASA_APOD_BASE_URL}?api_key=${apiKey}&date=${date}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.msg ||
          `NASA API error: ${response.status} ${response.statusText}`
      );
    }

    const data: ApodResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch APOD: ${error.message}`);
    }
    throw new Error("Failed to fetch APOD: Unknown error");
  }
}

/**
 * Fetch APOD for today
 */
export async function fetchApodToday(): Promise<ApodResponse> {
  const apiKey = getApiKey();
  const url = `${NASA_APOD_BASE_URL}?api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.msg ||
          `NASA API error: ${response.status} ${response.statusText}`
      );
    }

    const data: ApodResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch APOD: ${error.message}`);
    }
    throw new Error("Failed to fetch APOD: Unknown error");
  }
}

/**
 * Fetch APOD for a date range
 */
export async function fetchApodRange(
  startDate: string,
  endDate: string
): Promise<ApodResponse[]> {
  const apiKey = getApiKey();
  const url = `${NASA_APOD_BASE_URL}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.msg ||
          `NASA API error: ${response.status} ${response.statusText}`
      );
    }

    const data: ApodResponse[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch APOD range: ${error.message}`);
    }
    throw new Error("Failed to fetch APOD range: Unknown error");
  }
}

/**
 * Get formatted date string (YYYY-MM-DD)
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Validate date string format
 */
export function isValidDateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
