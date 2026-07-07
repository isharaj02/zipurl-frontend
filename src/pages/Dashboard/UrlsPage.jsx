import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

import CreateUrlForm from "@/components/url/CreateUrlForm";
import UrlTable from "@/components/url/UrlTable";

import { getMyUrls } from "@/services/url.service";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UrlsPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchUrls = async () => {
    try {
      setLoading(true);

      const response = await getMyUrls({
        page,
        limit: 10,
        search: debouncedSearch,
        status,
      });

      setUrls(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch URLs"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My URLs</h1>
        <p className="mt-1 text-muted-foreground">
          Create and manage your shortened URLs.
        </p>
      </div>

      <CreateUrlForm onUrlCreated={fetchUrls} />

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search by original URL or short code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <Select
          value={status || "all"}
          onValueChange={(value) =>
            setStatus(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
  <div className="rounded-lg border p-10 text-center">
    Loading URLs...
  </div>
) : (
  <>
    <UrlTable 
      urls={urls}
      onRefresh={fetchUrls}
     />

    {pagination && pagination.totalPages > 1 && (
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    )}
  </>
)}
    </div>
  );
}

export default UrlsPage;