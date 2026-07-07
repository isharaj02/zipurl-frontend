import { useState } from "react";
import { toast } from "react-toastify";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createShortUrl } from "@/services/url.service";
import CopyButton from "./CopyButton";

function CreateUrlForm({ onUrlCreated }) {
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const [formData, setFormData] = useState({
    originalUrl: "",
    customCode: "",
    expiresAt: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await createShortUrl(formData);

      const generatedUrl = `${import.meta.env.VITE_SHORT_URL}/${response.data.shortCode}`;

      setShortUrl(generatedUrl);

      toast.success(response.message);

      setFormData({
        originalUrl: "",
        customCode: "",
        expiresAt: "",
      });

      if (onUrlCreated) {
        onUrlCreated();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create short URL"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="originalUrl">Original URL</Label>
            <Input
              id="originalUrl"
              type="url"
              name="originalUrl"
              placeholder="https://example.com"
              value={formData.originalUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="customCode">Custom Code (Optional)</Label>
            <Input
              id="customCode"
              type="text"
              name="customCode"
              placeholder="my-link"
              value={formData.customCode}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
            <Input
              id="expiresAt"
              type="datetime-local"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
            />
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Short URL"}
          </Button>

          {shortUrl && (
            <div className="mt-4 rounded-lg border p-4">
              <Label>Generated Short URL</Label>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-600 hover:underline"
                >
                  {shortUrl}
                </a>

                <CopyButton text={shortUrl} />
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateUrlForm;