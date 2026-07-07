import { Copy } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

function CopyButton({ text }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
    >
      <Copy size={16} />
      <span className="ml-2">Copy</span>
    </Button>
  );
}

export default CopyButton;