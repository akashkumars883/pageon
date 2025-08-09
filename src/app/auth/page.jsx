"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClients";
import { useAuth } from "@/context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { user } = useAuth();

  // Admin email constant
  const ADMIN_EMAIL = "ak706908@gmail.com";

  // Check if current user is admin
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (user) {
      // Redirect admin to admin dashboard, regular users to home
      if (isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }
  }, [user, isAdmin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear message when user starts typing
    if (message.text) setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Email and password are required" });
      return false;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return false;
    }

    if (isSignUp) {
      if (!formData.fullName.trim()) {
        setMessage({ type: "error", text: "Full name is required" });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" });
        return false;
      }
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Account created successfully! Please check your email to verify your account.",
      });

      // Reset form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      const isAdminUser = formData.email === ADMIN_EMAIL;
      setMessage({
        type: "success",
        text: `Signed in successfully!${
          isAdminUser ? " Redirecting to admin dashboard..." : ""
        }`,
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setMessage({ type: "success", text: "Signed out successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const resetPassword = async () => {
    if (!formData.email) {
      setMessage({
        type: "error",
        text: "Please enter your email address first",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );
      if (error) throw error;

      setMessage({ type: "success", text: "Password reset email sent!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const goToAdminDashboard = () => {
    window.location.href = "/admin";
  };

  const goToHomeDashboard = () => {
    window.location.href = "/";
  };

  // If user is already authenticated, show dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
        <div className="relative overflow-hidden bg-black rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>

          <div className="relative z-10">
            {/* Status badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-white text-sm">Authenticated</span>
              </div>
            </div>

            <div
              className={`w-20 h-20 ${
                isAdmin
                  ? "bg-gradient-to-br from-purple-500 to-purple-700"
                  : "bg-gradient-to-br from-blue-500 to-blue-700"
              } rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
            >
              {isAdmin ? (
                <Shield className="w-10 h-10 text-white" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
              {isAdmin ? "Admin Access" : "Welcome back!"}
            </h2>

            <p className="text-gray-300 mb-2">
              {isAdmin
                ? "You have administrator privileges"
                : "You are currently signed in as:"}
            </p>

            <p
              className={`text-lg font-semibold mb-8 ${
                isAdmin ? "text-purple-400" : "text-blue-400"
              }`}
            >
              {user.email}
            </p>

            <div className="space-y-4">
              {isAdmin ? (
                <>
                  <button
                    onClick={goToAdminDashboard}
                    className="group w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Go to Admin Dashboard</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={goToHomeDashboard}
                    className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Go to User Dashboard</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </>
              ) : (
                <button
                  onClick={goToHomeDashboard}
                  className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="w-full bg-white/10 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12">
      <div className="relative overflow-hidden bg-black rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md my-4">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            {/* Status badge */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-white text-sm">
                  {isSignUp ? "Create Account" : "Sign In"}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isSignUp ? "Join Us Today" : "Welcome Back"}
            </h1>
            <p className="text-gray-300 text-sm">
              {isSignUp
                ? "Create your account to get started"
                : "Sign in to your account"}
            </p>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`p-3 rounded-xl mb-4 backdrop-blur-sm border text-sm ${
                message.type === "error"
                  ? "bg-red-500/10 text-red-300 border-red-500/30"
                  : "bg-green-500/10 text-green-300 border-green-500/30"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading}
              className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-200/30 border-t-white mr-3" />
                  Loading...
                </div>
              ) : (
                <>
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>

          {/* Forgot Password (Sign In Only) */}
          {!isSignUp && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={resetPassword}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-2">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFormData({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  fullName: "",
                });
                setMessage({ type: "", text: "" });
              }}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
