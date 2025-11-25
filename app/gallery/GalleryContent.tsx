// Server Component to fetch gallery data
import ApodCard from "@/components/ApodCard";
import { ApiResponse, ApodResponse } from "@/lib/types";
import { formatDate } from "@/lib/nasaClient";

async function getRecentApods(): Promise<ApodResponse[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // Get date range for last 20 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 19); // 20 days including today

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  const res = await fetch(`${baseUrl}/api/apod/range?start=${start}&end=${end}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch APOD gallery");
  }

  const data: ApiResponse<ApodResponse[]> = await res.json();

  if (!data.success || !data.data) {
    throw new Error(data.error || "Failed to fetch APOD gallery");
  }

  // Sort in descending order (most recent first)
  return data.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function GalleryContent() {
  const apods = await getRecentApods();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {apods.map((apod) => (
        <ApodCard key={apod.date} apod={apod} variant="compact" />
      ))}
    </div>
  );
}

