"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClients";
import { generateSlug } from "@/lib/slugUtils";

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-800 border-t-white"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-gray-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-difference filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-300 rounded-full mix-blend-difference filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-500 rounded-full mix-blend-difference filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Launch Your Business
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses already thriving on our platform. Create your profile in minutes.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Two Column Layout for Large Screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center mr-4 font-bold">
                        <span className="text-lg">1</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">Business Essentials</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Business Name *
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
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
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                          name="type"
                          onChange={handleChange}
                          placeholder="Restaurant, Retail, Technology, etc."
                          required
                          value={form.type}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          WhatsApp Number *
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                          name="whatsapp"
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          required
                          value={form.whatsapp}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Business Description *
                        </label>
                        <textarea
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
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
                      <div className="w-10 h-10 bg-gray-300 text-black rounded-xl flex items-center justify-center mr-4 font-bold">
                        <span className="text-lg">2</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">Contact Details</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Email Address
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-300 focus:ring-2 focus:ring-gray-300/20 transition-all duration-300"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          placeholder="your@email.com"
                          value={form.email}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Phone Number
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-300 focus:ring-2 focus:ring-gray-300/20 transition-all duration-300"
                          name="phone"
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          value={form.phone}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Business Address
                      </label>
                      <input
                        className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-300 focus:ring-2 focus:ring-gray-300/20 transition-all duration-300"
                        name="address"
                        onChange={handleChange}
                        placeholder="Your complete business address"
                        value={form.address}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Business Details */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gray-600 text-white rounded-xl flex items-center justify-center mr-4 font-bold">
                        <span className="text-lg">3</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">Business Profile</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Services & Products
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all duration-300"
                          name="services"
                          onChange={handleChange}
                          placeholder="Web Design, Marketing, Consulting"
                          value={form.services}
                        />
                        <p className="text-xs text-gray-500 mt-2">Separate multiple items with commas</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            Website URL
                          </label>
                          <input
                            className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all duration-300"
                            name="website"
                            onChange={handleChange}
                            placeholder="https://yourbusiness.com"
                            value={form.website}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            Opening Hours
                          </label>
                          <input
                            className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all duration-300"
                            name="opening_hours"
                            onChange={handleChange}
                            placeholder="Mon-Fri: 9AM-6PM"
                            value={form.opening_hours}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Social Media Links
                        </label>
                        <input
                          className="w-full px-6 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:bg-gray-950 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all duration-300"
                          name="social_links"
                          onChange={handleChange}
                          placeholder="Facebook, Instagram, LinkedIn URLs"
                          value={form.social_links}
                        />
                        <p className="text-xs text-gray-500 mt-2">Separate multiple links with commas</p>
                      </div>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gray-500 text-white rounded-xl flex items-center justify-center mr-4 font-bold">
                        <span className="text-lg">4</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">Brand Identity</h2>
                    </div>
                    
                    <div
                      className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                        dragActive
                          ? "border-white bg-white/5 scale-105"
                          : form.logo
                          ? "border-gray-400 bg-gray-400/5"
                          : "border-gray-600 hover:border-gray-400 hover:bg-gray-800/20"
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
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto">
                              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-semibold text-lg">{form.logo.name}</p>
                              <p className="text-gray-400">Ready to upload!</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-20 h-20 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center mx-auto">
                              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
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
                  className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform border-2 ${
                    uploading
                      ? "bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed scale-95"
                      : "bg-white text-black border-white hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-white/10 hover:scale-105 active:scale-95"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-400 border-t-transparent mr-3"></div>
                      Creating Your Business Profile...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Launch Your Business Now
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}