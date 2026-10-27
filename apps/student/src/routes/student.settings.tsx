// apps/student/src/routes/student.settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { 
  Lock, Bell, Shield, LogOut, 
  CheckCircle, AlertCircle,
  Settings as SettingsIcon,
  ChevronDown, Globe, Mail,
  Smartphone, Sparkles, Award, TrendingUp
} from "lucide-react";
import React, { useEffect, useState, type FormEvent } from "react";
import { getMe, getNotifications, markNotificationsRead, apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { ThemeSelect } from "@/components/theme-provider";

export const Route = createFileRoute("/student/settings")({
  component: Settings,
});

type TabType = "security" | "notifications" | "preferences";

async function patchProfile(data: Record<string, any>) {
  return await apiRequest<any>("/auth/me/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("security");
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Password form
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm: ''
  });
  
  // Notification preferences
  const [notifPrefs, setNotifPrefs] = useState({
    email_enrolled: true,
    email_cert: true,
    email_streak: true,
    email_news: false,
    push_enrolled: true,
    push_cert: true
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [profileData, notificationList] = await Promise.all([
          getMe().catch(() => null),
          getNotifications().catch(() => []),
        ]);
        
        if (profileData) {
          setProfile(profileData);
        }
        setNotifications(Array.isArray(notificationList) ? notificationList : []);
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError('Could not load settings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (passwordData.new_password !== passwordData.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (passwordData.new_password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsSaving(true);
    try {
      await patchProfile({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password
      });
      setSuccess('Password changed successfully!');
      setPasswordData({ old_password: '', new_password: '', confirm: '' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to change password. Please check your current password.');
      console.error('Password change error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsRead();
      setNotifications([]);
    } catch (err) {
      console.error('Failed to mark notifications read:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const tabs = [
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-xs sm:text-sm text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
            Settings
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">
            Manage your security, notifications, and preferences
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
            <SettingsIcon className="h-3 w-3" />
            <span className="hidden xs:inline">{profile?.role || 'Student'}</span>
            <span className="inline xs:hidden">{profile?.role?.charAt(0) || 'S'}</span>
          </span>
        </div>
      </div>

      {/* Mobile Tab Selector */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2">
            {activeTabData && (
              <span className="text-blue-600">
                <activeTabData.icon className="h-5 w-5" />
              </span>
            )}
            <span className="text-sm font-medium text-gray-900">
              {activeTabData?.label || 'Security'}
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                  {tab.label}
                  {isActive && <CheckCircle className="h-4 w-4 ml-auto text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 p-1.5 overflow-x-auto shadow-sm">
        <div className="flex gap-0.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 touch-manipulation ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="inline xs:hidden">{tab.label.charAt(0)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4 sm:space-y-6">
        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span>Change Password</span>
              </h3>
              <form onSubmit={handlePasswordChange} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="At least 8 characters"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="break-words">{error}</span>
                  </div>
                )}
                
                {success && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm text-emerald-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="break-words">{success}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50 active:scale-95 touch-manipulation"
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Account Status</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { label: 'Email verified', value: '✓ Verified', color: 'text-emerald-600' },
                  { label: 'Account status', value: 'Active ✓', color: 'text-emerald-600' },
                  { label: '2-Factor Authentication', value: 'Disabled', color: 'text-gray-500' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col xs:flex-row xs:justify-between gap-1 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-xs sm:text-sm text-gray-500">{item.label}</span>
                    <span className={`text-xs sm:text-sm font-semibold ${item.color} break-all`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                Enable 2-Factor Authentication →
              </button>
            </div>

            {/* Sign Out */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium active:scale-95 touch-manipulation"
              >
                <LogOut className="h-4 w-4" />
                Sign Out of All Devices
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-2">
                This will sign you out of all active sessions
              </p>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span>Notification Preferences</span>
                </h3>
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors active:scale-95 touch-manipulation"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'email_enrolled', label: 'Course enrollment confirmations', desc: 'Email when you enroll in a course' },
                  { key: 'email_cert', label: 'Certificate issued', desc: 'Email when you earn a certificate' },
                  { key: 'email_streak', label: 'Streak reminders', desc: 'Reminder when your streak is at risk' },
                  { key: 'email_news', label: 'Platform news & updates', desc: 'Monthly newsletter and announcements' },
                ].map((item) => (
                  <div key={item.key} className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-3 border-b border-gray-100 last:border-0">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{item.label}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 break-words">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start xs:self-center">
                      <input
                        type="checkbox"
                        checked={notifPrefs[item.key as keyof typeof notifPrefs]}
                        onChange={(e) => setNotifPrefs({ ...notifPrefs, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notifications */}
            {notifications.length > 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Notifications</h3>
                <div className="space-y-2 sm:space-y-3">
                  {notifications.slice(0, 5).map((item, index) => (
                    <div key={item.id || index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                      <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0">
                        <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 break-words">{item.title || item.message || 'Update'}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 break-words">{item.body || item.detail || 'New notification'}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Today'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <span>App Preferences</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-b border-gray-100">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Theme</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Choose your preferred theme</p>
                </div>
                <ThemeSelect />
              </div>

              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-b border-gray-100">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Language</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Select your preferred language</p>
                </div>
                <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2 border-b border-gray-100">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Timezone</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Your local timezone</p>
                </div>
                <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500">
                  <option>UTC+3 (EAT)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC-5 (EST)</option>
                </select>
              </div>

              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 py-2">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Auto-play videos</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Automatically play course videos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-blue-600 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;