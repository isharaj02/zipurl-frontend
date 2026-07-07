import { Badge } from "@/components/ui/badge";
import UrlActions from "./UrlActions";

function UrlTable({ urls = [], onRefresh, }) {
  if (urls.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-muted-foreground">
        No URLs found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Original URL</th>
            <th className="px-4 py-3 text-left">Short URL</th>
            <th className="px-4 py-3 text-center">Clicks</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Created</th>
            <th className="px-4 py-3 text-center">Expires</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => {
            let status = "Active";

            if (url.deleted_at) {
              status = "Deleted";
            } else if (
              url.expires_at &&
              new Date(url.expires_at) <= new Date()
            ) {
              status = "Expired";
            }

            const shortUrl = `${import.meta.env.VITE_SHORT_URL}/${url.short_code}`;

            return (
              <tr
                key={url.id}
                className="border-t"
              >
                <td className="max-w-xs truncate px-4 py-3">
                  <a
                    href={url.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.original_url}
                  </a>
                </td>

                <td className="px-4 py-3">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.short_code}
                  </a>
                </td>

                <td className="px-4 py-3 text-center">
                  {url.click_count}
                </td>

                <td className="px-4 py-3 text-center">
                    <Badge
                        variant={
                        status === "Active"
                            ? "default"
                            : status === "Expired"
                            ? "secondary"
                            : "destructive"
                        }
                    >
                        {status}
                    </Badge>
                </td>

                <td className="px-4 py-3 text-center">
                  {new Date(url.created_at).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  {url.expires_at
                    ? new Date(url.expires_at).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <UrlActions
                        url={url}
                        shortUrl={shortUrl}
                        status={status}
                        onSuccess={onRefresh}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}

export default UrlTable;