"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClients";
import {
  Building2,
  Edit2,
  Save,
  X,
  Phone,
  Settings,
  BarChart3,
  Globe,
  Eye,
  Plus,
  Crown,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servicesInput, setServicesInput] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in:", userError);
        setBusinesses([]);
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching businesses:", error);
        setBusinesses([]);
      } else {
        setBusinesses(data || []);
        if (data && data.length > 0) {
          setSelectedBusiness(data[0]);
          setServicesInput(data[0].services?.join(", ") || "");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUpdateServices = async () => {
    if (!selectedBusiness) return;
    setUpdating(true);
    setMessage("");

    const updatedServices = servicesInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const { data, error } = await supabase
      .from("businesses")
      .update({ services: updatedServices })
      .eq("id", selectedBusiness.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating services:", error);
      setMessage("Failed to update services.");
    } else {
      setSelectedBusiness(data);
      setBusinesses((prev) => prev.map((b) => (b.id === data.id ? data : b)));
      setMessage("Services updated successfully!");
      setEditing(false);
    }

    setUpdating(false);
  };

  const handleCancelEdit = () => {
    setServicesInput(selectedBusiness?.services?.join(", ") || "");
    setEditing(false);
    setMessage("");
  };

  const selectBusiness = (business) => {
    setSelectedBusiness(business);
    setServicesInput(business.services?.join(", ") || "");
    setEditing(false);
    setMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PageOn</h1>
                <span className="bg-black/10 text-black text-xs px-2 py-1 rounded-full font-medium">
                  Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {user?.email?.split("@")[0] || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split("@")[0] || "User"}!
          </h2>
          <p className="text-gray-600">
            Manage your businesses and track their performance from your
            dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Businesses
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {businesses.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Websites
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {businesses.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-green-600">+12%</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Plan Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                Free Plan
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  You're on the Free plan
                </h3>
                <p className="text-sm text-gray-600">
                  {businesses.length} business • Basic features • Community
                  support
                </p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Upgrade Banner */}
        {businesses.length >= 1 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Crown className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Want to create more businesses?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upgrade to Starter plan (199/month) to create up to 2
                    businesses
                  </p>
                </div>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Businesses List */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Your Businesses
              </h3>
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Upgrade to Create More</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            <div className="space-y-4">
              {businesses.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    No businesses yet
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Create your first business to get started
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    Create Business
                  </button>
                </div>
              ) : (
                businesses.map((business) => (
                  <div
                    key={business.id}
                    className={`bg-white border rounded-xl p-6 cursor-pointer transition-all ${
                      selectedBusiness?.id === business.id
                        ? "border-purple-300 ring-2 ring-purple-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => selectBusiness(business)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {business.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {business.name.toLowerCase().replace(/\s+/g, "")}-
                          {business.id}.pageon.com
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-3">
                          {business.description}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                          Type:{" "}
                          <span className="font-medium text-gray-900">
                            {business.type}
                          </span>
                        </span>
                      </div>
                      <span className="text-gray-600">
                        Plan:{" "}
                        <span className="font-medium text-gray-900">Free</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Business Details */}
          <div className="lg:col-span-2">
            {selectedBusiness ? (
              <div className="space-y-6">
                {/* Business Header */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    {selectedBusiness.logo_url ? (
                      <img
                        src={selectedBusiness.logo_url}
                        alt="Business Logo"
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200 mx-auto sm:mx-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center mx-auto sm:mx-0">
                        <Building2 className="w-10 h-10 text-purple-600" />
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedBusiness.name}
                      </h2>
                      <p className="text-gray-600 mb-3">
                        {selectedBusiness.type}
                      </p>
                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                          Active
                        </span>
                        <span className="text-sm text-gray-600">
                          {selectedBusiness.services?.length || 0} Services
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedBusiness.description}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          WhatsApp
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedBusiness.whatsapp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Services
                    </h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setEditing(true)}
                        className="inline-flex items-center space-x-2 text-sm bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit Services</span>
                      </button>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={handleUpdateServices}
                          disabled={updating}
                          className="inline-flex items-center justify-center space-x-2 text-sm bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 px-4 py-2 rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>{updating ? "Saving..." : "Save"}</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={updating}
                          className="inline-flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors border border-gray-200"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="services"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Services (comma separated)
                        </label>
                        <textarea
                          id="services"
                          value={servicesInput}
                          onChange={(e) => setServicesInput(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          placeholder="Web Development, Mobile Apps, Consulting"
                          rows={4}
                          disabled={updating}
                        />
                      </div>
                      {message && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">{message}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {selectedBusiness.services &&
                      selectedBusiness.services.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedBusiness.services.map((service, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 italic mb-4">
                            No services listed
                          </p>
                          <button
                            onClick={() => setEditing(true)}
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                          >
                            Add your first service
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a Business
                </h3>
                <p className="text-gray-600">
                  Choose a business from the left to view and manage its
                  details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
