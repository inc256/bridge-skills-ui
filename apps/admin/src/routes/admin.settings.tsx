import { createFileRoute } from "@tanstack/react-router";
import { 
  User, Lock, Globe, Mail, Database, CreditCard, Bot, Shield, 
  RefreshCw, Save, CheckCircle, XCircle, ExternalLink, Server,
  ChevronRight, Settings as SettingsIcon, Bell, Users, 
  Activity, AlertTriangle, Info, Key, Link, Cloud,
  Smartphone, Zap, Sparkles, Monitor, Code
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
// Import the authenticated apiRequest from lib/api
import { apiRequest } from "@/lib/api";
import { ThemeSettings } from "@/components/theme-provider";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

// ===================== TYPES =====================

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  bio?: string;
  headline?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  is_email_verified: boolean;
  is_verified: boolean;
  updated_at: string;
  full_name?: string;
}

interface PlatformConfig {
  platform: {
    name: string;
    url: string;
    currency: string;
    time_zone: string;
    debug: boolean;
  };
  email: {
    backend: string;
    host: string;
    port: number;
    use_tls: boolean;
    from_email: string;
    host_user: string;
  };
  database: {
    engine: string;
    name: string;
  };
  payments: {
    mtn_momo_configured: boolean;
    airtel_money_configured: boolean;
    stripe_configured: boolean;
    flutterwave_configured: boolean;
  };
  ai: {
    default_provider: string;
    openai_configured: boolean;
    anthropic_configured: boolean;
    gemini_configured: boolean;
  };
  cors: {
    allow_all_origins: boolean;
    frontend_url: string;
  };
  stats: {
    django_version: string;
    python_version: string;
    total_users: number;
    env_file_exists: boolean;
  };
}

interface Toast {
  msg: string;
  ok: boolean;
}

// ===================== COMPONENTS =====================

// Modal Component
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 mt-auto sm:mt-0">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 rounded-t-2xl">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

// Section Component
interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
}

function Section({ title, children, icon: Icon }: SectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-4 sm:mb-6">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

// Config Row Component
interface ConfigRowProps {
  label: string;
  value: string | number | boolean;
  note?: string;
  ok?: boolean;
  className?: string;
}

function ConfigRow({ label, value, note, ok, className = "" }: ConfigRowProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${className}`}>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        {note && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{note}</p>}
      </div>
      <div className="flex items-center gap-2 mt-1 sm:mt-0">
        {ok !== undefined && (
          ok ? <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" /> : <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0" />
        )}
        <span className={`text-sm ${typeof value === 'string' && value.startsWith('http') ? 'font-mono text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>
          {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value || '—'}
        </span>
      </div>
    </div>
  );
}

// Tab Button Component
interface TabButtonProps {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}

function TabButton({ id, label, icon: Icon, active, onClick }: TabButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-all ${
        active 
          ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="truncate">{label}</span>
      {active && <ChevronRight className="h-4 w-4 ml-auto" />}
    </button>
  );
}

// ===================== MAIN COMPONENT =====================

function AdminSettings() {
  const [tab, setTab] = useState('profile');
  const [config, setConfig] = useState<PlatformConfig | null>(null);
  const [cfgBusy, setCfgBusy] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Profile form
  const [form, setForm] = useState({ 
    first_name: '', 
    last_name: '', 
    bio: '', 
    headline: '', 
    phone: '', 
    website: '', 
    linkedin: '', 
    twitter: '' 
  });
  const [pw, setPw] = useState({ old_password: '', new_password: '', confirm: '' });

  // Settings form
  const [envForm, setEnvForm] = useState<Record<string, any>>({});
  const [emailTest, setEmailTest] = useState({ to: '', result: null as { ok: boolean; msg: string } | null, busy: false });

  const showToast = (msg: string, ok: boolean = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const loadUser = async () => {
    try {
      const data = await apiRequest<UserProfile>('/auth/me/');
      setUser(data);
      if (data) {
        setForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          bio: data.bio || '',
          headline: data.headline || '',
          phone: data.phone || '',
          website: data.website || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || ''
        });
      }
    } catch (err) {
      console.error('Failed to load user:', err);
      showToast('Failed to load user profile', false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (tab !== 'profile' && tab !== 'security' && !config) {
      loadConfig();
    }
  }, [tab]);

  const loadConfig = () => {
    setCfgBusy(true);
    apiRequest<PlatformConfig>('/settings/')
      .then(r => { 
        setConfig(r); 
        setEnvForm({}); 
      })
      .catch(() => showToast('Could not load platform configuration', false))
      .finally(() => setCfgBusy(false));
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await apiRequest<UserProfile>('/auth/me/', {
        method: 'PATCH',
        body: JSON.stringify(form)
      });
      setUser(data);
      showToast('Profile updated successfully! ✅');
    } catch {
      showToast('Failed to save profile', false);
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.new_password !== pw.confirm) { 
      showToast('Passwords do not match', false); 
      return; 
    }
    if (pw.new_password.length < 8) { 
      showToast('Password must be at least 8 characters', false); 
      return; 
    }
    setSaving(true);
    try {
      await apiRequest('/auth/me/password/', {
        method: 'POST',
        body: JSON.stringify({ 
          old_password: pw.old_password, 
          new_password: pw.new_password 
        })
      });
      showToast('Password changed successfully! 🔒');
      setPw({ old_password: '', new_password: '', confirm: '' });
    } catch (ex: any) {
      showToast(ex.message || 'Incorrect current password', false);
    } finally {
      setSaving(false);
    }
  };

  const saveEnvSettings = async () => {
    if (Object.keys(envForm).length === 0) { 
      showToast('No changes to save', false); 
      return; 
    }
    setSaving(true);
    try {
      const r = await apiRequest<any>('/settings/update/', {
        method: 'PATCH',
        body: JSON.stringify(envForm)
      });
      showToast(r.message || 'Settings saved successfully! ✅');
      setEnvForm({});
      loadConfig();
    } catch (ex: any) {
      showToast(ex.message || 'Failed to save settings', false);
    } finally {
      setSaving(false);
    }
  };

  const testEmailFn = async () => {
    setEmailTest(p => ({ ...p, busy: true, result: null }));
    try {
      await apiRequest('/settings/test-email/', {
        method: 'POST',
        body: JSON.stringify({ to: emailTest.to || user?.email })
      });
      setEmailTest(p => ({ 
        ...p, 
        busy: false, 
        result: { ok: true, msg: 'Test email sent successfully! 📧' } 
      }));
    } catch (ex: any) {
      setEmailTest(p => ({ 
        ...p, 
        busy: false, 
        result: { ok: false, msg: ex.message || 'Failed to send test email' } 
      }));
    }
  };

  const handleEnvChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEnvForm(p => ({ ...p, [key]: e.target.value }));
  };

  const handleFormChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [key]: e.target.value }));
  };

  const handlePasswordChange = (key: keyof typeof pw) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(p => ({ ...p, [key]: e.target.value }));
  };

  const TABS = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'platform', label: 'Platform Info', icon: Globe },
    { id: 'email', label: 'Email Config', icon: Mail },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'ai', label: 'AI Providers', icon: Bot },
    { id: 'api', label: 'API & CORS', icon: Shield },
  ];

  // Toast
  if (toast) {
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`
          fixed top-4 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white text-xs sm:text-sm font-medium shadow-lg
          ${toast.ok ? 'bg-green-500' : 'bg-red-500'}
          animate-slide-in
        `}>
          <div className="flex items-center gap-2">
            <span className="flex-1">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="text-white/80 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <SettingsIcon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            <span>Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            Manage your profile, platform configuration, and integrations
          </p>
        </div>
      </div>

      <ThemeSettings />

      {/* Main Layout - Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Mobile Tabs Dropdown */}
        <div className="lg:w-56 shrink-0">
          {/* Mobile: Tab Select */}
          <div className="lg:hidden mb-3">
            <select
              value={tab}
              onChange={(e) => setTab(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              {TABS.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
          
          {/* Desktop: Sidebar */}
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3.5">
              Settings
            </p>
            <div className="space-y-1">
              {TABS.map(t => (
                <TabButton
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  icon={t.icon}
                  active={tab === t.id}
                  onClick={() => setTab(t.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">

          {/* ── PROFILE ─────────────────────────────────────────── */}
          {tab === 'profile' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Profile</h2>
              
              <Section title="Personal Information" icon={User}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-sm">
                    {(user?.full_name || user?.first_name || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {user?.full_name || user?.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email} · <span className="text-green-600 dark:text-green-400 font-semibold capitalize">{user?.role}</span>
                    </p>
                  </div>
                </div>
                
                <form onSubmit={saveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                      <input 
                        value={form.first_name} 
                        onChange={handleFormChange('first_name')} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                      <input 
                        value={form.last_name} 
                        onChange={handleFormChange('last_name')} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Headline / Role</label>
                    <input 
                      value={form.headline} 
                      onChange={handleFormChange('headline')} 
                      placeholder="e.g. Platform Administrator" 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                    <textarea 
                      value={form.bio} 
                      onChange={handleFormChange('bio')} 
                      rows={3} 
                      placeholder="Brief description of your role…" 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                      <input 
                        value={form.phone} 
                        onChange={handleFormChange('phone')} 
                        placeholder="+256 7XX XXX XXX" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Website</label>
                      <input 
                        value={form.website} 
                        onChange={handleFormChange('website')} 
                        placeholder="https://…" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">LinkedIn</label>
                      <input 
                        value={form.linkedin} 
                        onChange={handleFormChange('linkedin')} 
                        placeholder="linkedin.com/in/…" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Twitter/X</label>
                      <input 
                        value={form.twitter} 
                        onChange={handleFormChange('twitter')} 
                        placeholder="@username" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      disabled={saving} 
                      className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                        saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                  </div>
                </form>
              </Section>
            </div>
          )}

          {/* ── SECURITY ─────────────────────────────────────────── */}
          {tab === 'security' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
              
              <Section title="Change Password" icon={Lock}>
                <form onSubmit={changePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
                    <input 
                      type="password" 
                      value={pw.old_password} 
                      onChange={handlePasswordChange('old_password')} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                    <input 
                      type="password" 
                      value={pw.new_password} 
                      onChange={handlePasswordChange('new_password')} 
                      required 
                      placeholder="Min. 8 characters" 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Confirm New Password</label>
                    <input 
                      type="password" 
                      value={pw.confirm} 
                      onChange={handlePasswordChange('confirm')} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      disabled={saving} 
                      className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                        saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {saving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </Section>
              
              <Section title="Account Security" icon={Shield}>
                {[
                  ['Email Verified', user?.is_email_verified, user?.is_email_verified ? 'Your email is verified' : 'Email not verified'],
                  ['Account Verified', user?.is_verified, user?.is_verified ? 'Account is verified' : 'Account pending verification'],
                  ['Role', undefined, user?.role + ' — full platform access'],
                  ['Last Login', undefined, user?.updated_at ? new Date(user.updated_at).toLocaleString() : '—'],
                ].map(([k, status, note]) => (
                  <ConfigRow key={k as string} label={k as string} value={note as string} ok={status as boolean} />
                ))}
              </Section>
            </div>
          )}

          {/* ── PLATFORM ─────────────────────────────────────────── */}
          {tab === 'platform' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platform Information</h2>
              
              {cfgBusy ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : config ? (
                <>
                  <Section title="Platform Identity" icon={Globe}>
                    <ConfigRow label="Platform Name" value={config.platform?.name} />
                    <ConfigRow label="Platform URL" value={config.platform?.url} />
                    <ConfigRow label="Currency" value={config.platform?.currency} />
                    <ConfigRow label="Timezone" value={config.platform?.time_zone} />
                    <ConfigRow label="Debug Mode" value={config.platform?.debug ? 'ON (dev)' : 'OFF (prod)'} ok={!config.platform?.debug} />
                  </Section>
                  
                  <Section title="Update Platform Settings" icon={Server}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Changes are written to the .env file. Restart the server to apply.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Platform Name</label>
                        <input 
                          value={envForm.PLATFORM_NAME ?? config.platform?.name ?? ''} 
                          onChange={handleEnvChange('PLATFORM_NAME')} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Platform URL</label>
                        <input 
                          value={envForm.PLATFORM_URL ?? config.platform?.url ?? ''} 
                          onChange={handleEnvChange('PLATFORM_URL')} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Currency</label>
                        <input 
                          value={envForm.PLATFORM_CURRENCY ?? config.platform?.currency ?? ''} 
                          onChange={handleEnvChange('PLATFORM_CURRENCY')} 
                          placeholder="UGX" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <div className="flex justify-end">
                        <button 
                          onClick={saveEnvSettings} 
                          disabled={saving} 
                          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {saving ? 'Saving...' : 'Save to .env'}
                        </button>
                      </div>
                    </div>
                  </Section>
                  
                  <Section title="System Info" icon={Info}>
                    <ConfigRow label="Django Version" value={config.stats?.django_version} />
                    <ConfigRow label="Python Version" value={config.stats?.python_version} />
                    <ConfigRow label="Total Users" value={config.stats?.total_users} />
                    <ConfigRow label=".env File" value={config.stats?.env_file_exists ? 'Found ✓' : 'Missing ✗'} ok={config.stats?.env_file_exists} />
                  </Section>
                </>
              ) : null}
            </div>
          )}

          {/* ── EMAIL ──────────────────────────────────────────────── */}
          {tab === 'email' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Email Configuration</h2>
              
              {cfgBusy ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : config ? (
                <>
                  <Section title="Current Email Settings" icon={Mail}>
                    <ConfigRow label="Backend" value={config.email?.backend?.split('.').pop() || '—'} />
                    <ConfigRow label="Host" value={config.email?.host || '—'} />
                    <ConfigRow label="Port" value={config.email?.port || '—'} />
                    <ConfigRow label="TLS" value={config.email?.use_tls ? 'Enabled' : 'Disabled'} ok={config.email?.use_tls} />
                    <ConfigRow label="From" value={config.email?.from_email || '—'} />
                    <ConfigRow label="Username" value={config.email?.host_user || '— (not configured)'} ok={!!config.email?.host_user} />
                  </Section>
                  
                  <Section title="Update Email Settings" icon={Server}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Backend</label>
                        <select 
                          value={envForm.EMAIL_BACKEND ?? config.email?.backend ?? ''} 
                          onChange={handleEnvChange('EMAIL_BACKEND')} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="django.core.mail.backends.console.EmailBackend">Console (dev — prints to terminal)</option>
                          <option value="django.core.mail.backends.smtp.EmailBackend">SMTP (production)</option>
                          <option value="django.core.mail.backends.dummy.EmailBackend">Dummy (silent)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">SMTP Host</label>
                          <input 
                            value={envForm.EMAIL_HOST ?? config.email?.host ?? ''} 
                            onChange={handleEnvChange('EMAIL_HOST')} 
                            placeholder="smtp.gmail.com" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">SMTP Port</label>
                          <input 
                            type="number" 
                            value={envForm.EMAIL_PORT ?? String(config.email?.port ?? 587)} 
                            onChange={handleEnvChange('EMAIL_PORT')} 
                            placeholder="587" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Username/Email</label>
                        <input 
                          value={envForm.EMAIL_HOST_USER ?? config.email?.host_user ?? ''} 
                          onChange={handleEnvChange('EMAIL_HOST_USER')} 
                          placeholder="your@gmail.com" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">From Email</label>
                        <input 
                          value={envForm.DEFAULT_FROM_EMAIL ?? config.email?.from_email ?? ''} 
                          onChange={handleEnvChange('DEFAULT_FROM_EMAIL')} 
                          placeholder="TechBridge <noreply@…>" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Note: Email password must be set directly in the .env file (SMTP passwords are never shown for security).</p>
                      <div className="flex justify-end">
                        <button 
                          onClick={saveEnvSettings} 
                          disabled={saving} 
                          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {saving ? 'Saving...' : 'Save Email Settings'}
                        </button>
                      </div>
                    </div>
                  </Section>
                  
                  <Section title="Test Email" icon={Mail}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        value={emailTest.to} 
                        onChange={e => setEmailTest(p => ({ ...p, to: e.target.value }))} 
                        placeholder={`Send test to ${user?.email || 'your email'}`} 
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      />
                      <button 
                        onClick={testEmailFn} 
                        disabled={emailTest.busy} 
                        className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                          emailTest.busy ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {emailTest.busy ? 'Sending…' : 'Send Test'}
                      </button>
                    </div>
                    {emailTest.result && (
                      <div className={`mt-3 p-3 rounded-lg text-sm ${emailTest.result.ok ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                        {emailTest.result.msg}
                      </div>
                    )}
                  </Section>
                </>
              ) : null}
            </div>
          )}

          {/* ── DATABASE ──────────────────────────────────────────── */}
          {tab === 'database' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Database</h2>
              
              {cfgBusy ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : config ? (
                <>
                  <Section title="Database Connection" icon={Database}>
                    <ConfigRow label="Engine" value={config.database?.engine || '—'} ok={!!config.database?.engine} />
                    <ConfigRow label="Database" value={config.database?.name || '—'} />
                    <ConfigRow label="Status" value="Connected ✓" ok={true} />
                  </Section>
                  
                  <Section title="Switch Database" icon={Server}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Current: <strong>{config.database?.engine}</strong>. To switch to MySQL or PostgreSQL, update the .env file and restart.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Database Engine</label>
                        <select 
                          value={envForm.DB_ENGINE ?? config.database?.engine ?? 'postgresql'} 
                          onChange={handleEnvChange('DB_ENGINE')} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="mysql">MySQL (cPanel / DigitalOcean / AWS RDS)</option>
                          <option value="postgresql">PostgreSQL (Heroku / Supabase / Railway)</option>
                        </select>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">For MySQL/PostgreSQL, also set DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT in the .env file directly.</p>
                      <div className="flex justify-end">
                        <button 
                          onClick={saveEnvSettings} 
                          disabled={saving} 
                          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {saving ? 'Saving...' : 'Save DB Engine'}
                        </button>
                      </div>
                    </div>
                  </Section>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
                    <strong>💡 Migration guide:</strong> After switching, run <code className="bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-300 font-mono text-xs">python manage.py migrate</code> in the backend folder.
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* ── PAYMENTS ──────────────────────────────────────────── */}
          {tab === 'payments' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Gateways</h2>
              
              {cfgBusy ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : config ? (
                <>
                  <Section title="Gateway Status" icon={CreditCard}>
                    {[
                      ['MTN Mobile Money', config.payments?.mtn_momo_configured, 'Set MTN_MOMO_SUBSCRIPTION_KEY, MTN_MOMO_API_USER, MTN_MOMO_API_KEY in .env'],
                      ['Airtel Money', config.payments?.airtel_money_configured, 'Set AIRTEL_MONEY_CLIENT_ID, AIRTEL_MONEY_CLIENT_SECRET in .env'],
                      ['Stripe (Cards)', config.payments?.stripe_configured, 'Set STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY in .env'],
                      ['Flutterwave (Africa)', config.payments?.flutterwave_configured, 'Set FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY in .env'],
                    ].map(([name, configured, help]) => (
                      <div key={name as string} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{name as string}</p>
                          {!configured && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{help as string}</p>}
                        </div>
                        {configured
                          ? <span className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mt-1 sm:mt-0">✓ Configured</span>
                          : <span className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 mt-1 sm:mt-0">✗ Not configured</span>
                        }
                      </div>
                    ))}
                  </Section>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>🔑 API Keys:</strong> Payment keys must be set directly in the <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-800 dark:text-yellow-300 font-mono text-xs">.env</code> file (never via the UI for security).
                    Edit <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-800 dark:text-yellow-300 font-mono text-xs">techbridge_backend/.env</code> and restart the server.
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* ── AI ──────────────────────────────────────────────────── */}
          {tab === 'ai' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Providers</h2>
              
              {cfgBusy ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : config ? (
                <>
                  <Section title="AI Provider Status" icon={Bot}>
                    <ConfigRow label="Default Provider" value={config.ai?.default_provider || '—'} />
                    {[
                      ['OpenAI (GPT-4)', config.ai?.openai_configured, 'Set OPENAI_API_KEY in .env'],
                      ['Anthropic (Claude)', config.ai?.anthropic_configured, 'Set ANTHROPIC_API_KEY in .env'],
                      ['Google Gemini', config.ai?.gemini_configured, 'Set GEMINI_API_KEY in .env'],
                    ].map(([name, ok, help]) => (
                      <div key={name as string} className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{name as string}</p>
                          {!ok && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{help as string}</p>}
                        </div>
                        {ok
                          ? <span className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mt-1 sm:mt-0">✓ Configured</span>
                          : <span className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 mt-1 sm:mt-0">✗ Not set</span>
                        }
                      </div>
                    ))}
                  </Section>
                  
                  <Section title="Set Default AI Provider" icon={Sparkles}>
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Default Provider</label>
                        <select 
                          value={envForm.AI_DEFAULT_PROVIDER ?? config.ai?.default_provider ?? 'openai'} 
                          onChange={handleEnvChange('AI_DEFAULT_PROVIDER')} 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          {['openai', 'anthropic', 'gemini', 'mistral', 'groq', 'openrouter'].map(p => (
                            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        onClick={saveEnvSettings} 
                        disabled={saving} 
                        className={`w-full sm:w-auto px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                          saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </Section>
                </>
              ) : null}
            </div>
          )}

          {/* ── API & CORS ────────────────────────────────────────── */}
          {tab === 'api' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">API & CORS</h2>
              
              {cfgBusy ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
                </div>
              ) : config ? (
                <>
                  <Section title="CORS Configuration" icon={Shield}>
                    <ConfigRow label="Allow All Origins" value={config.cors?.allow_all_origins ? 'Yes (development)' : 'No (restricted)'} ok={true} />
                    <ConfigRow label="Frontend URL" value={config.cors?.frontend_url || '—'} />
                  </Section>
                  
                  <Section title="Update CORS Settings" icon={Link}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Frontend URL (React portal)</label>
                        <input 
                          value={envForm.FRONTEND_URL ?? config.cors?.frontend_url ?? ''} 
                          onChange={handleEnvChange('FRONTEND_URL')} 
                          placeholder="http://localhost:3000" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">CORS_ALLOW_ALL_ORIGINS=True is recommended for development. For production, set it to False and list specific origins.</p>
                      <div className="flex justify-end">
                        <button 
                          onClick={saveEnvSettings} 
                          disabled={saving} 
                          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
                            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {saving ? 'Saving...' : 'Save CORS Settings'}
                        </button>
                      </div>
                    </div>
                  </Section>
                  
                  <Section title="API Quick Links" icon={Code}>
                    {[
                      ['Swagger UI (all endpoints)', 'https://techbridge-backend-rust.vercel.app/api/docs/'],
                      ['ReDoc documentation', 'https://techbridge-backend-rust.vercel.app/api/redoc/'],
                      ['Health check', 'https://techbridge-backend-rust.vercel.app/api/health/'],
                      ['Django Admin (full DB)', 'https://techbridge-backend-rust.vercel.app/admin/'],
                      ['API v1 root', 'https://techbridge-backend-rust.vercel.app/api/v1/'],
                    ].map(([label, url]) => (
                      <div key={label as string} className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label as string}</p>
                        <a href={url as string} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 sm:mt-0">
                          {url.toString().replace('https://techbridge-backend-rust.vercel.app', '')} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </Section>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
}

// Import missing X component
import { X } from "lucide-react";