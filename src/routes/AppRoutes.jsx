import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import PublicRoute from "@/routes/PublicRoutes";
import ProtectedRoute from "@/routes/ProtectedRoute";


import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import UrlsPage from "@/pages/Dashboard/UrlsPage";
import AnalyticsPage from "@/pages/Dashboard/AnalyticsPage";
import SettingsPage from "@/pages/Dashboard/SettingsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
          } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
          } />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
          <Route
            path="/dashboard/urls"
            element={<UrlsPage />}
          />
          <Route
            path="/dashboard/urls/:id/analytics"
            element={<AnalyticsPage />}
          />
          <Route
            path="/dashboard/settings"
            element={<SettingsPage />}
          />
        </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;