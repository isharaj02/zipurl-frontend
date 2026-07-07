import { Trash2, RotateCcw, BarChart3 } from "lucide-react";
import { toast } from "react-toastify";

import CopyButton from "./CopyButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  deleteUrl,
  restoreUrl,
} from "@/services/url.service";

function UrlActions({
  url,
  shortUrl,
  status,
  onSuccess,
  
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteUrl(url.id);

      toast.success(response.message);

      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete URL"
      );
    }
  };

  const handleRestore = async () => {
    try {
      setLoading(true);
      const response = await restoreUrl(url.id);

      toast.success(response.message);

      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to restore URL"
      );
    }
  };

  return (
    <div className="flex justify-center gap-2">
      <CopyButton text={shortUrl} />

      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          navigate(`/dashboard/urls/${url.id}/analytics`)
        }
      >
        <BarChart3 size={16} />
      </Button>

      {status === "Deleted" ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
            >
              <RotateCcw size={16} />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Restore URL?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This URL will become active again.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={loading}
                onClick={handleRestore}
              >
                {loading ? "Restoring..." : "Restore"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
            >
              <Trash2 size={16} />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete URL?
              </AlertDialogTitle>

              <AlertDialogDescription>
                You can restore it later.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={loading}
                onClick={handleDelete}
              >
                {loading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default UrlActions;