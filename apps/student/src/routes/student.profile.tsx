import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle,
  Edit,
  Flame,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Save,
  Sparkles,
  Target,
  TrendingUp,
  Twitter,
  User,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { getMe, apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/student/profile")({
  component: Account,
});

type ProfileForm = {
  first_name: string;
  last_name: string;
  bio: string;
  headline: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  github: string;
  location: string;
  learning_goal: string;
};

type ProfileData = Partial<ProfileForm> & {
  full_name?: string;
  username?: string;
  country?: string;
  xp?: number;
  level?: number;
  courses_completed?: number;
  streak_days?: number;
  role?: string;
  email?: string;
  is_email_verified?: boolean;
  created_at?: string;
};

const emptyForm: ProfileForm = {
  first_name: "",
  last_name: "",
  bio: "",
  headline: "",
  phone: "",
  website: "",
  linkedin: "",
  twitter: "",
  github: "",
  location: "",
  learning_goal: "",
};

async function patchProfile(data: ProfileForm) {
  return apiRequest<ProfileData>("/auth/me/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

function Account() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState<ProfileForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      try {
        const profileData = await getMe();
        if (!active) return;
        if (profileData) {
          setProfile(profileData);
          setFormData({
            first_name: profileData.first_name || "",
            last_name: profileData.last_name || "",
            bio: profileData.bio || "",
            headline: profileData.headline || "",
            phone: profileData.phone || "",
            website: profileData.website || "",
            linkedin: profileData.linkedin || "",
            twitter: profileData.twitter || "",
            github: profileData.github || "",
            location: profileData.location || profileData.country || "",
            learning_goal: profileData.learning_goal || "",
          });
        }
      } catch (loadError) {
        console.error("Failed to load profile:", loadError);
        if (active) setError("Could not load your profile. Please try again.");
      } finally {
        if (active) setIsLoading(false);
      }
    };
    void loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updated = await patchProfile(formData);
      setProfile(updated);
      setFormData((current) => ({
        ...current,
        first_name: updated.first_name ?? current.first_name,
        last_name: updated.last_name ?? current.last_name,
      }));
      setSuccess("Your account details have been updated.");
      setIsEditing(false);
    } catch (saveError) {
      console.error("Profile update error:", saveError);
      setError("We couldn't save your changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    setError(null);
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      bio: profile?.bio || "",
      headline: profile?.headline || "",
      phone: profile?.phone || "",
      website: profile?.website || "",
      linkedin: profile?.linkedin || "",
      twitter: profile?.twitter || "",
      github: profile?.github || "",
      location: profile?.location || profile?.country || "",
      learning_goal: profile?.learning_goal || "",
    });
    setIsEditing(false);
  };

  const name =
    profile?.full_name ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    profile?.username ||
    user?.full_name ||
    user?.username ||
    "Learner";
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join("") || "L";
  const stats = [
    {
      icon: Award,
      label: "Experience points",
      value: profile?.xp ?? user?.xp ?? 0,
      tone: "text-amber-600 bg-amber-500/10",
    },
    {
      icon: TrendingUp,
      label: "Learning level",
      value: profile?.level ?? user?.level ?? 1,
      tone: "text-primary bg-primary/10",
    },
    {
      icon: GraduationCap,
      label: "Courses completed",
      value: profile?.courses_completed ?? user?.courses_completed ?? 0,
      tone: "text-emerald-600 bg-emerald-500/10",
    },
    {
      icon: Flame,
      label: "Learning streak",
      value: `${profile?.streak_days ?? user?.streak_days ?? 0} days`,
      tone: "text-orange-600 bg-orange-500/10",
    },
  ];

  const updateField = (field: keyof ProfileForm, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const inputClassName =
    "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  const fieldLabelClassName = "mb-1.5 block text-xs font-medium text-muted-foreground";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <PageSkeleton rows={4} />
          <p className="text-sm text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-3 sm:p-5 lg:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Your space
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Account
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Manage your profile and celebrate your learning progress.
          </p>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => {
              setError(null);
              setSuccess(null);
              setIsEditing(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Edit className="h-4 w-4" />
            Edit profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={cancelEditing}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
            <button
              form="account-profile-form"
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </header>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-sm text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 p-3.5 text-sm text-success"
        >
          <CheckCircle className="h-4 w-4 shrink-0" /> {success}
        </div>
      )}

      <section className="card-surface overflow-hidden">
        <div className="relative overflow-hidden bg-[#155a4a] px-5 py-6 text-white sm:px-8 sm:py-8">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-20 h-56 w-56 rounded-full border-[28px] border-white/5"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 right-1/4 h-52 w-52 rounded-full border-[24px] border-white/5"
          />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-semibold shadow-lg backdrop-blur sm:h-24 sm:w-24 sm:text-3xl">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                  {name}
                </h2>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                  {profile?.role || "Student"}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/75">
                {profile?.headline || "Building skills, one lesson at a time."}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/75">
                {(profile?.email || user?.email) && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {profile?.email || user?.email}
                  </span>
                )}
                {(profile?.location || profile?.country) && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile?.location || profile?.country}
                  </span>
                )}
                {profile?.is_email_verified && (
                  <span className="inline-flex items-center gap-1.5 text-emerald-100">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Email verified
                  </span>
                )}
              </div>
            </div>
            <Sparkles className="hidden h-8 w-8 shrink-0 text-emerald-100/80 sm:block" />
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 p-4 sm:px-5 sm:py-5">
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${stat.tone}`}
              >
                <stat.icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold tabular-nums text-foreground">
                  {stat.value}
                </p>
                <p className="text-[11px] leading-tight text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.8fr)]">
        <section className="card-surface p-5 sm:p-6">
          <div className="mb-5 flex items-start gap-3 border-b border-border pb-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">Personal information</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                The details that help your learning community get to know you.
              </p>
            </div>
          </div>

          {isEditing ? (
            <form id="account-profile-form" onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={fieldLabelClassName}>First name</span>
                  <input
                    value={formData.first_name}
                    onChange={(event) => updateField("first_name", event.target.value)}
                    className={inputClassName}
                    autoComplete="given-name"
                  />
                </label>
                <label>
                  <span className={fieldLabelClassName}>Last name</span>
                  <input
                    value={formData.last_name}
                    onChange={(event) => updateField("last_name", event.target.value)}
                    className={inputClassName}
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label className="block">
                <span className={fieldLabelClassName}>Headline</span>
                <input
                  value={formData.headline}
                  onChange={(event) => updateField("headline", event.target.value)}
                  className={inputClassName}
                  placeholder="e.g. Aspiring network engineer"
                />
              </label>
              <label className="block">
                <span className={fieldLabelClassName}>About you</span>
                <textarea
                  value={formData.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  rows={4}
                  className={`${inputClassName} resize-y`}
                  placeholder="Share a little about yourself and what you're learning."
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={fieldLabelClassName}>Location</span>
                  <input
                    value={formData.location}
                    onChange={(event) => updateField("location", event.target.value)}
                    className={inputClassName}
                    placeholder="City, country"
                    autoComplete="address-level2"
                  />
                </label>
                <label>
                  <span className={fieldLabelClassName}>Learning goal</span>
                  <input
                    value={formData.learning_goal}
                    onChange={(event) => updateField("learning_goal", event.target.value)}
                    className={inputClassName}
                    placeholder="What are you working toward?"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={fieldLabelClassName}>Phone</span>
                  <input
                    value={formData.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className={inputClassName}
                    placeholder="+256 7XX XXX XXX"
                    autoComplete="tel"
                  />
                </label>
                <label>
                  <span className={fieldLabelClassName}>Website</span>
                  <input
                    value={formData.website}
                    onChange={(event) => updateField("website", event.target.value)}
                    className={inputClassName}
                    placeholder="https://example.com"
                    autoComplete="url"
                  />
                </label>
              </div>
              <div>
                <p className={fieldLabelClassName}>Social profiles</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="relative">
                    <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={formData.linkedin}
                      onChange={(event) => updateField("linkedin", event.target.value)}
                      className={`${inputClassName} pl-9`}
                      placeholder="LinkedIn URL"
                    />
                  </label>
                  <label className="relative">
                    <Twitter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={formData.twitter}
                      onChange={(event) => updateField("twitter", event.target.value)}
                      className={`${inputClassName} pl-9`}
                      placeholder="X / Twitter URL"
                    />
                  </label>
                  <label className="relative">
                    <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={formData.github}
                      onChange={(event) => updateField("github", event.target.value)}
                      className={`${inputClassName} pl-9`}
                      placeholder="GitHub URL"
                    />
                  </label>
                </div>
              </div>
              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-5">
              <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                {profile?.bio ||
                  "Add a short introduction to tell your learning community about yourself."}
              </p>
              <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                <Detail
                  label="Location"
                  value={profile?.location || profile?.country}
                  icon={MapPin}
                />
                <Detail label="Learning goal" value={profile?.learning_goal} icon={Target} />
                <Detail label="Phone" value={profile?.phone} icon={Phone} />
                <Detail
                  label="Website"
                  value={profile?.website}
                  icon={Globe}
                  href={profile?.website}
                />
              </div>
              {(profile?.linkedin || profile?.twitter || profile?.github) && (
                <div className="border-t border-border pt-5">
                  <p className="mb-3 text-xs font-medium text-muted-foreground">Social profiles</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
                      { key: "twitter", label: "X / Twitter", Icon: Twitter },
                      { key: "github", label: "GitHub", Icon: Github },
                    ].map(({ key, label, Icon }) => {
                      const href = profile?.[key];
                      if (!href) return null;
                      return (
                        <a
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-secondary"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="card-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Your learning goal</h3>
                <p className="text-xs text-muted-foreground">Keep your next milestone in sight.</p>
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm leading-6 text-foreground">
              {profile?.learning_goal ||
                "Set a learning goal to keep your studies focused and intentional."}
            </p>
          </section>
          <section className="card-surface p-5">
            <h3 className="text-sm font-semibold text-foreground">Account details</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">Email address</p>
                  <p className="truncate text-sm font-medium text-foreground">
                    {profile?.email || user?.email || "Not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] text-muted-foreground">Member since</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                        })
                      : "Recently joined"}
                  </p>
                </div>
              </div>
              {profile?.is_email_verified && (
                <div className="flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-3 py-2.5 text-xs font-medium text-success">
                  <CheckCircle className="h-4 w-4" /> Your email is verified
                </div>
              )}
            </div>
          </section>
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold text-foreground">
              Keep building your momentum
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              A little progress each day adds up to skills that last.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value?: string | null;
  icon: typeof Mail;
  href?: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        {href && value ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-medium text-primary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="break-words text-sm font-medium text-foreground">{value || "Not set"}</p>
        )}
      </div>
    </div>
  );
}

export default Account;
