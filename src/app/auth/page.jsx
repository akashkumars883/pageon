"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClients";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div
            className={`w-16 h-16 ${
              isAdmin ? "bg-purple-100" : "bg-green-100"
            } rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {isAdmin ? (
              <Shield className="w-8 h-8 text-purple-600" />
            ) : (
              <User className="w-8 h-8 text-green-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isAdmin ? "Admin Access" : "Welcome back!"}
          </h2>
          <p className="text-gray-600 mb-4">
            {isAdmin
              ? "You have administrator privileges"
              : "You are currently signed in as:"}
          </p>
          <p
            className={`text-lg font-semibold mb-6 ${
              isAdmin ? "text-purple-600" : "text-indigo-600"
            }`}
          >
            {user.email}
          </p>

          <div className="space-y-3">
            {isAdmin ? (
              <>
                <button
                  onClick={goToAdminDashboard}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Go to Admin Dashboard
                </button>
                <button
                  onClick={goToHomeDashboard}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Go to User Dashboard
                </button>
              </>
            ) : (
              <button
                onClick={goToHomeDashboard}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {isSignUp ? "Sign up to get started" : "Sign in to your account"}
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Full Name (Sign Up Only) */}
          {isSignUp && (
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </div>

        {/* Forgot Password (Sign In Only) */}
        {!isSignUp && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={resetPassword}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Forgot your password?
            </button>
          </div>
        )}

        {/* Toggle Sign Up/Sign In */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
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
            className="mt-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
