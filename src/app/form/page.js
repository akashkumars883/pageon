"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClients";
import { generateSlug } from "@/lib/slugUtils";
import {
  Building2,
  Upload,
  Check,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Share2,
  Sparkles,
  ArrowRight,
  User,
  Briefcase,
} from "lucide-react";

export default function Create() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    services: "",
    whatsapp: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    social_links: "",
    opening_hours: "",
    logo: null,
  });
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm((prev) => ({
        ...prev,
        logo: e.dataTransfer.files[0],
      }));
    }
  };

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        alert("Please log in first.");
      }
      setUser(session?.user || null);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative overflow-hidden bg-black rounded-2xl shadow-2xl p-12 w-full max-w-md text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-white text-sm">Authenticating</span>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto"></div>
              <div
                className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-400 animate-spin mx-auto"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>

            <p className="text-white font-medium">Loading your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (!form.logo) {
        alert("Please upload logo");
        setUploading(false);
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(form.logo.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
        setUploading(false);
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (form.logo.size > maxSize) {
        alert("File size must be less than 5MB");
        setUploading(false);
        return;
      }

      const fileExt = form.logo.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      // Upload logo to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("logos")
        .upload(fileName, form.logo, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert(`Image upload failed: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      // Get public URL for the uploaded logo
      const { data: urlData } = supabase.storage
        .from("logos")
        .getPublicUrl(fileName);

      const logoUrl = urlData.publicUrl;

      // Generate slug from business name
      const slug = generateSlug(form.name);
      console.log("Generated slug:", slug);

      // Insert business data into database
      const { data, error } = await supabase
        .from("businesses")
        .insert([
          {
            name: form.name,
            type: form.type,
            description: form.description,
            logo_url: logoUrl,
            services: form.services.split(",").map((s) => s.trim()),
            whatsapp: form.whatsapp,
            email: form.email,
            phone: form.phone,
            address: form.address,
            website: form.website,
            social_links: form.social_links
              ? form.social_links.split(",").map((s) => s.trim())
              : [],
            opening_hours: form.opening_hours,
            slug: slug,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        console.error("Database error:", error);
        alert(`Error saving business: ${error.message}`);
      } else {
        console.log("Business saved:", data);
        if (data && data.length > 0) {
          // Use slug for navigation if available, otherwise use id
          const businessIdentifier = data[0].slug || data[0].id;
          router.push(`/${businessIdentifier}`);
        } else {
          alert("Business saved successfully!");
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert(`An unexpected error occurred: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-8 px-4 sm:px-6">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-black/10 backdrop-blur-sm py-3 px-6 rounded-full">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-black text-sm font-medium">
                Small Business Website Builder
              </span>
            </div>
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-600 rounded-2xl mb-6 shadow-2xl">
            <Building2 className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
            Launch Your <span className="text-blue-600">Business</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already thriving on our platform.
            Create your profile in minutes.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative overflow-hidden bg-black rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Two Column Layout for Large Screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center mr-4 font-bold shadow-lg">
                        <User className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Business Essentials
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Business Name *
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
                          name="name"
                          onChange={handleChange}
                          placeholder="Enter your business name"
                          required
                          value={form.name}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Business Category *
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                          <input
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
                            name="type"
                            onChange={handleChange}
                            placeholder="Restaurant, Retail, Technology, etc."
                            required
                            value={form.type}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                          <input
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
                            name="whatsapp"
                            onChange={handleChange}
                            placeholder="+91 9876543210"
                            required
                            value={form.whatsapp}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Business Description *
                        </label>
                        <textarea
                          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 resize-none"
                          name="description"
                          onChange={handleChange}
                          placeholder="Tell customers what makes your business special..."
                          required
                          value={form.description}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center mr-4 font-bold shadow-lg">
                        <Mail className="w-6 h-6 z-10" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Contact Details
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                          <input
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="your@email.com"
                            value={form.email}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                          <input
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300"
                            name="phone"
                            onChange={handleChange}
                            placeholder="+91 9876543210"
                            value={form.phone}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Business Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                        <input
                          className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300"
                          name="address"
                          onChange={handleChange}
                          placeholder="Your complete business address"
                          value={form.address}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Business Details */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center mr-4 font-bold shadow-lg">
                        <Briefcase className="w-6 h-6 z-10" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Business Profile
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Services & Products
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300"
                          name="services"
                          onChange={handleChange}
                          placeholder="Web Design, Marketing, Consulting"
                          value={form.services}
                        />
                        <p className="text-xs text-gray-400 mt-2">
                          Separate multiple items with commas
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            Website URL
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <input
                              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300"
                              name="website"
                              onChange={handleChange}
                              placeholder="https://yourbusiness.com"
                              value={form.website}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            Opening Hours
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <input
                              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300"
                              name="opening_hours"
                              onChange={handleChange}
                              placeholder="Mon-Fri: 9AM-6PM"
                              value={form.opening_hours}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Social Media Links
                        </label>
                        <div className="relative">
                          <Share2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                          <input
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/15 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300"
                            name="social_links"
                            onChange={handleChange}
                            placeholder="Facebook, Instagram, LinkedIn URLs"
                            value={form.social_links}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Separate multiple links with commas
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center mr-4 font-bold shadow-lg">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Brand Identity
                      </h2>
                    </div>

                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                        dragActive
                          ? "border-white bg-white/10 scale-105"
                          : form.logo
                          ? "border-green-400 bg-green-400/5"
                          : "border-white/30 hover:border-white/50 hover:bg-white/5"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        required
                      />

                      <div className="space-y-4">
                        {form.logo ? (
                          <>
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                              <Check className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-semibold text-lg">
                                {form.logo.name}
                              </p>
                              <p className="text-green-400">Ready to upload!</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mx-auto">
                              <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-xl font-semibold text-white mb-2">
                                Upload Your Logo
                              </p>
                              <p className="text-gray-400">
                                Drag & drop your logo here or click to browse
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                PNG, JPG, GIF or WebP • Max 5MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={uploading}
                  className={`group w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center ${
                    uploading
                      ? "bg-white/10 text-gray-400 cursor-not-allowed scale-95"
                      : "bg-gradient-to-r from-blue-600 to-blue-600 text-white hover:from-blue-700 hover:to-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-400/30 border-t-gray-400 mr-3"></div>
                      Creating Your Business Profile...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 mr-3" />
                      <span>Launch Your Business Now</span>
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
