import { useEffect, useState } from "react";
import { getDashboardOverview } from "@/services/url.service";
import {
  Link2,
  CheckCircle2,
  Clock3,
  Trash2,
  MousePointerClick,
} from "lucide-react";
import { Copy, BarChart3 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardOverview();
        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleCopy = async (shortCode) => {
    try {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_SHORT_URL}/${shortCode}`
      );

      toast.success("Short URL copied!");
    } catch (error) {
      toast.error("Failed to copy URL.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const stats = [
    {
      title: "Total URLs",
      value: dashboard.totalUrls,
      icon: Link2,
    },
    {
      title: "Active URLs",
      value: dashboard.activeUrls,
      icon: CheckCircle2,
    },
    {
      title: "Expired URLs",
      value: dashboard.expiredUrls,
      icon: Clock3,
    },
    {
      title: "Deleted URLs",
      value: dashboard.deletedUrls,
      icon: Trash2,
    },
    {
      title: "Total Clicks",
      value: dashboard.totalClicks,
      icon: MousePointerClick,
    },
  ];

  const chartData = [
    {
      name: "Active",
      value: dashboard.activeUrls,
    },
    {
      name: "Expired",
      value: dashboard.expiredUrls,
    },
    {
      name: "Deleted",
      value: dashboard.deletedUrls,
    },
  ];
  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border bg-white dark:bg-gray-900 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border bg-white dark:bg-gray-900 shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            URL Distribution
          </h2>
        </div>

        <div className="h-[350px] p-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 rounded-xl border bg-white dark:bg-gray-900 shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Recent URLs
          </h2>
        </div>

        {dashboard.recentUrls.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No URLs created yet.
          </div>
        ) : (
          <div className="divide-y">
            {dashboard.recentUrls.map((url) => {
              const isDeleted = url.deleted_at;

              const isExpired =
                !isDeleted &&
                url.expires_at &&
                new Date(url.expires_at) <= new Date();

              const status = isDeleted
                ? "Deleted"
                : isExpired
                ? "Expired"
                : "Active";

              return (
                <div
                  key={url.id}
                  className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex-1">
                    <p className="truncate font-medium">
                      {url.original_url}
                    </p>

                    <p className="mt-1 text-sm text-blue-600">
                      {url.short_code}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Created{" "}
                      {new Date(url.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium
                        ${
                          status === "Active"
                            ? "bg-green-100 text-green-700"
                            : status === "Expired"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {status}
                    </span>

                    <span className="text-sm font-medium">
                      {url.click_count} Clicks
                    </span>

                    <button
                      onClick={() => handleCopy(url.short_code)}
                      className="rounded-lg border p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Copy size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/dashboard/urls/${url.id}/analytics`)
                      }
                      className="rounded-lg border p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <BarChart3 size={18} />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div> 

  );
}

export default DashboardPage;