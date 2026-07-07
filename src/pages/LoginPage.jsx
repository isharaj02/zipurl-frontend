import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await loginUser(formData);

      const token = response.data.token;

      login(token);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Link
              to="/register"
              className="block text-center text-sm"
            >
              Create account
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;