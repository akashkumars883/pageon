"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClients";
import {
  Search,
  Edit3,
  Trash2,
  Eye,
  Menu,
  X,
  Home,
  Building2,
  Users,
  BarChart3,
  Settings,
  Plus,
  Calendar,
  TrendingUp,
  Filter,
  MoreVertical,
  Save,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    services: "",
    website: "",
    description: ""
  });

  useEffect(() => {
    fetchUser();
    fetchBusinesses();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) console.error("Error fetching user:", error);
    else setUser(data.user);
  };

  const fetchBusinesses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("businesses").select("*");
    if (error) console.error("Error fetching businesses:", error);
    else setBusinesses(data || []);
    setLoading(false);
  };

  const filteredBusinesses = businesses.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.email?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Business name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format";
    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) errors.phone = "Invalid phone format";
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) errors.website = "Website must start with http:// or https://";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      services: "",
      website: "",
      description: ""
    });
    setFormErrors({});
    setSelectedBusiness(null);
  };

  // Create business
  const createBusiness = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormLoading(true);
    const { data, error } = await supabase
      .from("businesses")
      .insert([formData])
      .select();

    if (error) {
      console.error("Create error:", error);
      setFormErrors({ submit: "Failed to create business. Please try again." });
    } else {
      setBusinesses([...businesses, ...data]);
      setShowCreateModal(false);
      resetForm();
    }
    setFormLoading(false);
  };

  // Update business
  const updateBusiness = async (e) => {
    e.preventDefault();
    if (!validateForm() || !selectedBusiness) return;

    setFormLoading(true);
    const { data, error } = await supabase
      .from("businesses")
      .update(formData)
      .eq("id", selectedBusiness.id)
      .select();

    if (error) {
      console.error("Update error:", error);
      setFormErrors({ submit: "Failed to update business. Please try again." });
    } else {
      setBusinesses(businesses.map(b =>
        b.id === selectedBusiness.id ? data[0] : b
      ));
      setShowEditModal(false);
      resetForm();
    }
    setFormLoading(false);
  };

  // Delete business
  const deleteBusiness = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this business? This action cannot be undone.");
    if (!confirm) return;

    const { error } = await supabase.from("businesses").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete business. Please try again.");
    } else {
      setBusinesses(businesses.filter(b => b.id !== id));
    }
  };

  // Handle view business
  const viewBusiness = (business) => {
    setSelectedBusiness(business);
    setShowViewModal(true);
  };

  // Handle edit business
  const editBusiness = (business) => {
    setSelectedBusiness(business);
    setFormData({
      name: business.name || "",
      email: business.email || "",
      phone: business.phone || "",
      address: business.address || "",
      services: business.services || "",
      website: business.website || "",
      description: business.description || ""
    });
    setShowEditModal(true);
  };

  // Handle create business
  const handleCreateClick = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const businessesThisWeek = businesses.filter(b => new Date(b.created_at) > oneWeekAgo).length;

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "businesses", label: "Businesses", icon: Building2 },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  // Modal Component
  const Modal = ({ show, onClose, title, children, size = "md" }) => {
    if (!show) return null;

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl"
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Business Form Component
  const BusinessForm = ({ onSubmit, submitText, loading }) => (
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      {formErrors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-700">{formErrors.submit}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.name ? 'border-red-300' : 'border-gray-300'
              }`}
            placeholder="Enter business name"
          />
          {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            placeholder="Enter email address"
          />
          {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
            placeholder="Enter phone number"
          />
          {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services
          </label>
          <select
            value={formData.services}
            onChange={(e) => setFormData({ ...formData, services: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Retail">Retail</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.website ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="https://example.com"
        />
        {formErrors.website && <p className="text-xs text-red-600 mt-1">{formErrors.website}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter business address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the business"
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {loading ? 'Saving...' : submitText}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  // Business Details Component
  const BusinessDetails = ({ business }) => (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Business Name</label>
          <p className="text-gray-900">{business.name || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
          <p className="text-gray-900">{business.email || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
          <p className="text-gray-900">{business.phone || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
          <p className="text-gray-900">{business.category || 'N/A'}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500 mb-1">Website</label>
          <p className="text-gray-900">
            {business.website ? (
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {business.website}
              </a>
            ) : 'N/A'}
          </p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
          <p className="text-gray-900">{business.address || 'N/A'}</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
          <p className="text-gray-900">{business.description || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Created</label>
          <p className="text-gray-900">
            {business.created_at ? new Date(business.created_at).toLocaleString() : 'N/A'}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
          <p className="text-gray-900">
            {business.updated_at ? new Date(business.updated_at).toLocaleString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Business
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-pink-200 p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Businesses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{businesses.length}</p>
            </div>
            <div className="bg-pink-100 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-pink-600" />
            </div>
          </div>
        </div>

        <div className="bg-blue-200 p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Week</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{businessesThisWeek}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-red-100 p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="bg-red-200 p-2 rounded-lg">
              <Users className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-orange-100 p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0%</p>
            </div>
            <div className="bg-orange-200 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Businesses */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Businesses</h2>
              <button
                onClick={() => setActiveTab("businesses")}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
              </div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No businesses found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {businesses.slice(0, 5).map((business) => (
                  <div key={business.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{business.name}</h3>
                        <p className="text-xs text-gray-500">{business.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={handleCreateClick}
                className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Add Business</span>
              </button>
              <button
                onClick={() => setActiveTab("businesses")}
                className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Building2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Manage Businesses</span>
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">View Analytics</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinesses = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Businesses</h1>
          <p className="text-gray-600 text-sm">Manage and monitor all business listings</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Business
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm text-sm">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Businesses List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Loading businesses...</p>
            </div>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {search ? `No businesses found for "${search}"` : "No businesses yet"}
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              {search ? "Try adjusting your search terms" : "Get started by adding your first business"}
            </p>
            {!search && (
              <button
                onClick={handleCreateClick}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Your First Business
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBusinesses.map((business) => (
                    <tr key={business.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Building2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{business.name}</div>
                            <div className="text-xs text-gray-500">{business.category || 'Business'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{business.email}</div>
                        <div className="text-xs text-gray-500">{business.phone || 'No phone'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {business.created_at ? new Date(business.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => viewBusiness(business)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => editBusiness(business)}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                            title="Edit Business"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBusiness(business.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Business"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4">
              <div className="space-y-3">
                {filteredBusinesses.map((business) => (
                  <div key={business.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{business.name}</h3>
                          <p className="text-xs text-gray-500">{business.email}</p>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {business.created_at ? new Date(business.created_at).toLocaleDateString() : 'No date'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => viewBusiness(business)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editBusiness(business)}
                          className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                          title="Edit Business"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteBusiness(business.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete Business"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "businesses":
        return renderBusinesses();
      case "users":
        return (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Users Management</h2>
            <p className="text-gray-500 text-sm">User management features coming soon...</p>
          </div>
        );
      case "analytics":
        return (
          <div className="text-center py-16">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h2>
            <p className="text-gray-500 text-sm">Analytics features coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-16">
            <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Settings</h2>
            <p className="text-gray-500 text-sm">Settings panel coming soon...</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PageOn</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-4 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User info */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email || 'Administrator'}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4">
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      <Modal
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Add New Business"
        size="lg"
      >
        <BusinessForm
          onSubmit={createBusiness}
          submitText="Create Business"
          loading={formLoading}
        />
      </Modal>

      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        title="Edit Business"
        size="lg"
      >
        <BusinessForm
          onSubmit={updateBusiness}
          submitText="Update Business"
          loading={formLoading}
        />
      </Modal>

      <Modal
        show={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedBusiness(null);
        }}
        title={selectedBusiness ? `${selectedBusiness.name} - Details` : "Business Details"}
        size="lg"
      >
        {selectedBusiness && <BusinessDetails business={selectedBusiness} />}
      </Modal>
    </div>
  );
}