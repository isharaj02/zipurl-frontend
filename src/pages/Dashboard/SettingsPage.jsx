import { useEffect, useState } from "react";
import { LogOut, User, Mail, Calendar } from "lucide-react";
import { getProfile } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

function SettingsPage() {
  const [profile, setProfile] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Settings
      </h1>

      <div className="rounded-xl border bg-white dark:bg-gray-900 shadow-sm p-6">

        <div className="space-y-6">

          <div className="flex items-center gap-4">
            <User className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>
              <p className="font-semibold">
                {profile.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>
              <p className="font-semibold">
                {profile.email}
              </p>
            </div>
          </div>

          {profile.created_at && (
            <div className="flex items-center gap-4">
              <Calendar className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">
                  Joined
                </p>
                <p className="font-semibold">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="mt-6 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default SettingsPage;