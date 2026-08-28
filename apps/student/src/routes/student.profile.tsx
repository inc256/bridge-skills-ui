// apps/student/src/routes/student.account.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  User, Mail, MapPin, Globe, Phone, AtSign, 
  Edit, Save, X, Camera, Award, TrendingUp, 
  CheckCircle, AlertCircle, Link as LinkIcon,
  Calendar, Briefcase, GraduationCap, Sparkles,
  Rocket, Target, BookOpen, Clock, Star, Heart,
  Twitter, Linkedin, Github, Youtube, Instagram,
  Shield, Zap, Layers, Compass, Flame
} from "lucide-react";
import React, { useEffect, useState, type FormEvent } from "react";
import { getMe, apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/student/profile")({
  component: Account,
});

async function patchProfile(data: Record<string, any>) {
  return await apiRequest<any>("/auth/me/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

function Account() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    headline: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    github: '',
    location: '',
    learning_goal: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const profileData = await getMe().catch(() => null);
        if (profileData) {
          setProfile(profileData);
          setFormData({
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            bio: profileData.bio || '',
            headline: profileData.headline || '',
            phone: profileData.phone || '',
            website: profileData.website || '',
            linkedin: profileData.linkedin || '',
            twitter: profileData.twitter || '',
            github: profileData.github || '',
            location: profileData.location || profileData.country || '',
            learning_goal: profileData.learning_goal || '',
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Could not load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updated = await patchProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        bio: formData.bio,
        headline: formData.headline,
        phone: formData.phone,
        website: formData.website,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github,
        location: formData.location,
        learning_goal: formData.learning_goal,
      });
      setProfile(updated);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    if (profile?.full_name) {
      const names = profile.full_name.split(' ');
      if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
      return names[0][0].toUpperCase();
    }
    if (profile?.first_name) return profile.first_name[0]?.toUpperCase() || 'U';
    return 'U';
  };

  const stats = [
    { icon: Award, label: "XP", value: profile?.xp || 0, color: "from-amber-400 to-amber-600", bg: "bg-amber-50" },
    { icon: TrendingUp, label: "Level", value: profile?.level || 1, color: "from-blue-400 to-blue-600", bg: "bg-blue-50" },
    { icon: GraduationCap, label: "Courses", value: profile?.courses_completed || 0, color: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50" },
    { icon: Flame, label: "Streak", value: `${profile?.streak_days || 0}d`, color: "from-orange-400 to-orange-600", bg: "bg-orange-50" },
  ];

  const socialLinks = [
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-600' },
    { key: 'twitter', icon: Twitter, label: 'Twitter', color: 'text-sky-500' },
    { key: 'github', icon: Github, label: 'GitHub', color: 'text-gray-700' },
  ];

  const getSocialLink = (key: string) => {
    return profile?.[key];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-sm text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
      <div className="space-y-6 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400 rounded-full blur-3xl" />
          </div>
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">My Account</h1>
              <p className="text-blue-100 mt-1 text-sm">Manage your personal information and public profile</p>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all hover:scale-105 active:scale-95 border border-white/30"
                >
                  <Edit className="h-4 w-4" />
                  <span className="font-medium">Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-medium disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-600 flex items-center gap-2 animate-in slide-in-from-top duration-300">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        {/* Profile Card */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                {profile?.role || 'Student'}
              </span>
              {profile?.is_email_verified && (
                <span className="px-3 py-1 bg-emerald-500/30 backdrop-blur-sm rounded-full text-xs text-white font-medium flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
          </div>

          {/* Avatar & Info */}
          <div className="relative px-6 pb-6">
            <div className="-mt-16 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-xl">
                  {getInitials()}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0 pb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                  {profile?.full_name || profile?.username || 'Student'}
                </h2>
                <p className="text-gray-500 text-sm truncate">{profile?.headline || 'Student at TechBridge'}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                  {profile?.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> {profile.email}
                    </span>
                  )}
                  {profile?.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {profile.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`${stat.bg} rounded-xl p-3 border border-gray-100/50 hover:shadow-md transition-all hover:-translate-y-0.5`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                      <stat.icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      <p className="text-[10px] text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                <input
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="e.g. Aspiring Network Engineer · Kampala"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                  placeholder="Tell the community about yourself..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Kampala, Uganda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Learning Goal</label>
                  <input
                    value={formData.learning_goal}
                    onChange={(e) => setFormData({ ...formData, learning_goal: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="e.g. Become a certified network engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="+256 7XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="https://yoursite.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Social Links</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Twitter/X URL"
                  />
                  <input
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="GitHub URL"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{profile?.bio || 'No bio yet. Tell the community about yourself!'}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm font-medium text-gray-900">{profile?.location || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Learning Goal</p>
                  <p className="text-sm font-medium text-gray-900">{profile?.learning_goal || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{profile?.phone || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Website</p>
                  <p className="text-sm font-medium text-gray-900">{profile?.website || 'Not set'}</p>
                </div>
              </div>

              {/* Social Links */}
              {socialLinks.some(link => getSocialLink(link.key)) && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => {
                      const url = getSocialLink(link.key);
                      if (!url) return null;
                      return (
                        <a
                          key={link.key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
                        >
                          <link.icon className={`h-5 w-5 ${link.color}`} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">Member since</p>
                <p className="text-sm font-medium text-gray-900">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Recent'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl inline-block mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">My Courses</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl inline-block mb-2">
              <Star className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">Certificates</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl inline-block mb-2">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">Progress</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100/50 p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl inline-block mb-2">
              <Rocket className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">Goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;