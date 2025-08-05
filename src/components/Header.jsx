"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClients";

export default function EnhancedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const { user, loading } = useAuth();

  // Admin email check
  const isAdmin = user?.email === "ak706908@gmail.com";

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setUserProfile(null);
        return;
      }

      setProfileLoading(true);
      try {
        // Try to get profile from Supabase profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, display_name")
          .eq("id", user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          console.log("Profile fetch error:", profileError);
        }

        // Create user profile object with fallbacks
        const userProfileData = {
          fullName:
            profile?.full_name ||
            profile?.display_name ||
            user?.user_metadata?.full_name ||
            user?.user_metadata?.name ||
            user?.email?.split("@")[0] ||
            "User",
          avatarUrl:
            profile?.avatar_url ||
            user?.user_metadata?.avatar_url ||
            user?.user_metadata?.picture ||
            null,
          email: user.email,
        };

        setUserProfile(userProfileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to user metadata
        setUserProfile({
          fullName:
            user?.user_metadata?.full_name ||
            user?.user_metadata?.name ||
            user?.email?.split("@")[0] ||
            "User",
          avatarUrl:
            user?.user_metadata?.avatar_url ||
            user?.user_metadata?.picture ||
            null,
          email: user.email,
        });
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Features", href: "features" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setProfileDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = (userProfile, user) => {
    if (userProfile?.fullName) {
      return userProfile.fullName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  const getUserDisplayName = (userProfile, user) => {
    return (
      userProfile?.fullName ||
      user?.user_metadata?.full_name ||
      user?.email?.split("@")[0] ||
      "User"
    );
  };

  const ProfileAvatar = ({
    userProfile,
    user,
    size = "w-8 h-8",
    textSize = "text-sm",
  }) => {
    const [imageError, setImageError] = useState(false);

    if (userProfile?.avatarUrl && !imageError) {
      return (
        <img
          src={userProfile.avatarUrl}
          alt="Profile"
          className={`${size} rounded-full object-cover border-2 border-white shadow-sm`}
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      );
    }

    return (
      <div
        className={`${size} rounded-full bg-black text-white flex items-center justify-center ${textSize} font-semibold`}
      >
        {getUserInitials(userProfile, user)}
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Enhanced Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-white/90 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-black hover:text-gray-700 transition-colors duration-300"
              >
                PageOn
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-black font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}

              {/* Authentication Section */}
              <div className="ml-6">
                {loading || profileLoading ? (
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : user ? (
                  /* Profile Dropdown */
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() =>
                        setProfileDropdownOpen(!profileDropdownOpen)
                      }
                      className="relative inline-flex items-center space-x-3 px-3 py-2 rounded-full transition-all duration-300 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                      onMouseEnter={() => setHoveredItem("profile")}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <ProfileAvatar userProfile={userProfile} user={user} />
                      <span className="text-gray-700 font-medium">
                        {getUserDisplayName(userProfile, user)}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl border border-gray-200 bg-white transition-all duration-300 transform origin-top-right ${profileDropdownOpen
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-95 invisible"
                        }`}
                    >
                      {/* User Info */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <ProfileAvatar
                            userProfile={userProfile}
                            user={user}
                            size="w-12 h-12"
                            textSize="text-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {getUserDisplayName(userProfile, user)}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user.email}
                            </p>
                            {isAdmin && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-black text-white mt-1">
                                Admin
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <a
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </a>
                        <a
                          href="/settings"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </a>
                        <a
                          href={isAdmin ? "/admin" : "/dashboard"}
                          className={`flex items-center space-x-3 px-4 py-3 transition-colors duration-200 ${isAdmin
                              ? "text-black hover:bg-gray-50"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>
                            {isAdmin ? "Admin Dashboard" : "Dashboard"}
                          </span>
                        </a>
                      </div>

                      {/* Sign Out */}
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* CTA Button for non-authenticated users */
                  <a
                    href="/auth"
                    className="relative inline-flex items-center px-6 py-2.5 bg-black text-white font-medium rounded-full shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md hover:scale-105 group"
                    onMouseEnter={() => setHoveredItem("cta")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="flex items-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              {user && <ProfileAvatar userProfile={userProfile} user={user} />}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-black transition-all duration-500 ease-out ${mobileMenuOpen ? "opacity-95" : "opacity-0"
            }`}
        />

        {/* Menu Content */}
        <div className="relative flex flex-col justify-center items-center h-full px-6 sm:px-8">
          <div className="text-center space-y-8 w-full max-w-md">
            {/* User Info for Mobile */}
            {user && (
              <div
                className={`transform transition-all duration-700 ease-out ${mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                  }`}
                style={{
                  transitionDelay: mobileMenuOpen ? "100ms" : "0ms",
                }}
              >
                <div className="flex flex-col items-center space-y-4 mb-12">
                  <ProfileAvatar
                    userProfile={userProfile}
                    user={user}
                    size="w-16 h-16"
                    textSize="text-xl"
                  />
                  <p className="text-xl font-semibold text-white">
                    {getUserDisplayName(userProfile, user)}
                  </p>
                  <p className="text-sm text-gray-300 break-all">
                    {user.email}
                  </p>
                  {isAdmin && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-black">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className={`transform transition-all duration-700 ease-out ${mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                  }`}
                style={{
                  transitionDelay: mobileMenuOpen
                    ? `${(user ? index + 1 : index) * 150 + 200}ms`
                    : "0ms",
                }}
              >
                <a
                  href={item.href}
                  className="block text-3xl font-bold text-white hover:text-gray-300 transition-all duration-300 hover:scale-105 transform"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div
              className={`transform transition-all duration-700 ease-out mt-16 space-y-6 ${mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
                }`}
              style={{
                transitionDelay: mobileMenuOpen
                  ? `${(user ? navItems.length + 1 : navItems.length) * 150 + 400
                  }ms`
                  : "0ms",
              }}
            >
              {user ? (
                <div className="space-y-6">
                  <a
                    href="/profile"
                    className="block text-xl font-semibold text-white hover:text-gray-300 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="block text-xl font-semibold text-white hover:text-gray-300 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </a>
                  <a
                    href={isAdmin ? "/admin" : "/dashboard"}
                    className={`block text-xl font-semibold transition-colors duration-300 ${isAdmin
                        ? "text-white hover:text-gray-300"
                        : "text-white hover:text-gray-300"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </a>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block text-xl font-semibold text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <a
                  href="/auth"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 transform group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">Get Started</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>

          {/* Subtle decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute bottom-32 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
}
