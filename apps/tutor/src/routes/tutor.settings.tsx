// apps/tutor/src/routes/tutor/settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useEffect, useState, type FormEvent } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  AtSign, 
  Play, 
  Phone, 
  CreditCard, 
  Banknote,
  Save,
  Shield,
  Mail,
  CheckCircle,
  AlertCircle,
  Camera,
  Edit,
  TrendingUp,
  Users,
  Award,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { getProfile, patchProfile, getTutorAnalytics } from "@/lib/api";

export const Route = createFileRoute("/tutor/settings")({
  component: TutorSettings,
});

function TutorSettings() {
  const [profile, setProfile] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const activeTab = 'profile';
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm: ''
  });
  const [notifications, setNotifications] = useState({
    email_enrolled: true,
    email_review: true,
    email_payout: true,
    email_news: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, analyticsData] = await Promise.all([
          getProfile().catch(() => null),
          getTutorAnalytics().catch(() => null)
        ]);
        setProfile(profileData);
        setAnalytics(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const updated = await patchProfile({
        headline: profile.headline,
        bio: profile.bio,
        expertise: profile.expertise,
        experience: profile.experience,
        momo_number: profile.momo_number,
        momo_provider: profile.momo_provider,
        bank_name: profile.bank_name,
        bank_account: profile.bank_account,
        bank_account_name: profile.bank_account_name,
        phone: profile.phone,
        website: profile.website,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        youtube: profile.youtube,
      });
      setProfile(updated);
      toast.success("Profile updated successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to save settings.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (passwordData.new_password !== passwordData.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.new_password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setSaving(true);
    try {
      // Use patchProfile for password change if your API supports it
      await patchProfile({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password
      });
      setPasswordData({ old_password: '', new_password: '', confirm: '' });
      toast.success("Password changed successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to change password.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-sm text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your instructor profile and public information</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-gray-200">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profile?.first_name?.[0] || profile?.username?.[0] || 'T'}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {profile?.full_name || profile?.username || 'Tutor'}
                  </h3>
                  <p className="text-sm text-gray-500">{profile?.email}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                      Instructor
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {analytics?.avg_rating || profile?.avg_rating || '0.0'} ★
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {(analytics?.total_students || profile?.total_students || 0).toLocaleString()} students
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>

              {/* Profile Form */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    value={profile?.first_name || ''}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    value={profile?.last_name || ''}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Professional Headline</label>
                <input
                  value={profile?.headline || ''}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="e.g. Network Engineer · CCNA · 8 years experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / About</label>
                <textarea
                  value={profile?.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                  placeholder="Tell students about your expertise and teaching style..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expertise</label>
                <input
                  value={profile?.expertise || ''}
                  onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="e.g. Networking, Cisco, Cloud Computing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience</label>
                <textarea
                  value={profile?.experience || ''}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                  placeholder="e.g. 8 years as a network engineer at MTN Uganda..."
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact & Social</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="+256 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                    <input
                      value={profile?.website || ''}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="https://yoursite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                    <input
                      value={profile?.linkedin || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Twitter</label>
                    <input
                      value={profile?.twitter || ''}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube</label>
                    <input
                      value={profile?.youtube || ''}
                      onChange={(e) => setProfile({ ...profile, youtube: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="youtube.com/channel/..."
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Payout Tab */}
        {activeTab === 'payout' && (
          <div className="p-4 sm:p-6">
            {/* Earnings Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Total Earnings</p>
                <p className="text-xl font-bold text-blue-600">
                  UGX {(analytics?.total_earnings || profile?.total_revenue || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Total Students</p>
                <p className="text-xl font-bold text-emerald-600">
                  {(analytics?.total_students || profile?.total_students || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Courses</p>
                <p className="text-xl font-bold text-purple-600">
                  {(analytics?.total_courses || profile?.total_courses || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-xl font-bold text-amber-600">
                  {analytics?.avg_rating || profile?.avg_rating || '0.0'} ★
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Mobile Money (MoMo)</h4>
                    <p className="text-xs text-gray-500">Primary payout method for Uganda</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">MoMo Provider</label>
                    <select
                      value={profile?.momo_provider || 'mtn'}
                      onChange={(e) => setProfile({ ...profile, momo_provider: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="airtel">Airtel Money</option>
                      <option value="vodafone">Vodafone Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">MoMo Phone Number</label>
                    <input
                      value={profile?.momo_number || ''}
                      onChange={(e) => setProfile({ ...profile, momo_number: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="+256 7XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Banknote className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Bank Account (Optional)</h4>
                    <p className="text-xs text-gray-500">For larger payouts via bank transfer</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bank Name</label>
                    <input
                      value={profile?.bank_name || ''}
                      onChange={(e) => setProfile({ ...profile, bank_name: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="e.g. Stanbic Bank Uganda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Number</label>
                    <input
                      value={profile?.bank_account || ''}
                      onChange={(e) => setProfile({ ...profile, bank_account: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Account number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Name</label>
                    <input
                      value={profile?.bank_account_name || ''}
                      onChange={(e) => setProfile({ ...profile, bank_account_name: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Name on the account"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Secure</p>
                    <p className="text-sm text-emerald-700">Your payout details are encrypted and only used for processing earnings withdrawals.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Payout Info"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="p-4 sm:p-6">
            <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Change Password</h4>
                  <p className="text-xs text-gray-500">Update your account password</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={passwordData.old_password}
                  onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Min. 8 characters"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Password Requirements</p>
                    <ul className="text-xs text-blue-700 mt-1 space-y-0.5">
                      <li>• Minimum 8 characters</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifs' && (
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Email Notifications</h4>
                <p className="text-xs text-gray-500">Manage your email notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email_enrolled', label: 'New student enrolled', description: 'Get notified when a student joins your course' },
                { key: 'email_review', label: 'New course review', description: 'Email when a student leaves a rating' },
                { key: 'email_payout', label: 'Payout processed', description: 'Confirm when your earnings are transferred' },
                { key: 'email_news', label: 'Platform news & updates', description: 'Monthly product updates from TechBridge' },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key as keyof typeof notifications]}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Email Preferences</p>
                  <p className="text-sm text-blue-700">You can unsubscribe from any notification at any time.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorSettings;