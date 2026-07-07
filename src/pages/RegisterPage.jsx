
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerUser } from "@/services/auth.service";

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
      );
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
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Registering..." : "Register"}
            </Button>

            <Link
              to="/login"
              className="block text-center text-sm"
            >
              Already have an account?
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;