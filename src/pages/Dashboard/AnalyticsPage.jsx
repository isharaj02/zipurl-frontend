import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import CopyButton from "@/components/url/CopyButton";

import { getUrlAnalytics } from "@/services/url.service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function AnalyticsPage() {
  const { id } = useParams();
  
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const shortUrl = analytics
  ? `${import.meta.env.VITE_SHORT_URL}/${analytics.short_code}`
  : "";

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getUrlAnalytics(id);

      setAnalytics(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to fetch analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-lg border p-10 text-center">
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-lg border p-10 text-center">
        Analytics not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/dashboard/urls">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My URLs
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">
        URL Analytics
      </h1>

      <p className="mt-1 text-muted-foreground">
        View the performance and details of your shortened URL.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Original URL</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <a
              href={analytics.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-600 hover:underline"
            >
              {analytics.original_url}
            </a>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Short URL</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-600 hover:underline"
            >
              {shortUrl}
            </a>

            <CopyButton text={shortUrl} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="h-full">
          <CardHeader>

            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <p className="text-3xl font-bold">
              {analytics.click_count}
            </p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <Badge
              variant={
                analytics.deleted_at
                  ? "destructive"
                  : analytics.expires_at &&
                    new Date(analytics.expires_at) <= new Date()
                  ? "secondary"
                  : "default"
              }
            >
              {analytics.deleted_at
                ? "Deleted"
                : analytics.expires_at &&
                  new Date(analytics.expires_at) <= new Date()
                ? "Expired"
                : "Active"}
            </Badge>

          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Created</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <p>
              {new Date(
                analytics.created_at
              ).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Expires</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <p>
              {analytics.expires_at
                ? new Date(
                    analytics.expires_at
                  ).toLocaleDateString()
                : "Never"}
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
  }

export default AnalyticsPage;