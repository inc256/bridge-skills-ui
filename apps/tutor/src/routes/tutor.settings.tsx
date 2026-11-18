import { createFileRoute } from "@tanstack/react-router";
import { Edit, Save, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";

export const Route = createFileRoute("/tutor/settings")({
  component: TutorSettings,
});

interface MockProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  bio: string;
}

const initialProfile: MockProfile = {
  firstName: "Mubarak",
  lastName: "Luutu",
  email: "mubarak@gmail.com",
  phone: "0788 220 011",
  dateOfBirth: "12/03/2000",
  country: "Uganda",
  bio: "An experienced tutor committed to helping learners build practical skills through clear lessons, hands-on projects, and supportive guidance.",
};

const fieldClassName =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none placeholder:text-gray-400 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/15 disabled:cursor-default disabled:opacity-100 dark:border-border dark:bg-background dark:text-foreground";

function TutorSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const fullName = `${draft.firstName} ${draft.lastName}`.trim();
  const updateField = (field: keyof MockProfile, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const startEditing = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const saveChanges = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  return (
    <div className="-mx-3 -mt-4 min-h-[calc(100vh-4rem)] bg-white pb-8 dark:bg-background sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8">
      <div
        className="absolute left-0 right-0 top-0 h-[200px] bg-[#166534] dark:bg-[#111b16] sm:h-[220px]"
        aria-hidden="true"
      />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-5 px-4 pb-8 pt-20 sm:px-5 sm:pt-[100px]">
        <section className="relative flex min-h-[120px] flex-col items-center rounded-2xl border border-gray-200 bg-card px-5 pb-5 pt-[60px] text-center shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-7 sm:py-5 sm:pl-40 sm:text-left">
          <div className="absolute left-1/2 top-[-60px] grid h-[120px] w-[120px] -translate-x-1/2 place-items-center rounded-full border-[5px] border-card bg-gradient-to-br from-amber-200 via-orange-100 to-emerald-100 text-3xl font-bold text-[#166534] shadow-md sm:left-[30px] sm:top-[-50px] sm:h-[140px] sm:w-[140px] sm:translate-x-0 sm:text-4xl">
            {`${draft.firstName[0] ?? ""}${draft.lastName[0] ?? ""}`}
            <button
              type="button"
              onClick={startEditing}
              aria-label="Edit profile"
              className="absolute bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#22c55e] text-white transition-colors hover:bg-[#16a34a] sm:bottom-1.5 sm:right-1.5"
            >
              <Edit className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-[#166534] dark:text-emerald-300">
              {fullName}
            </h1>
            <a
              href={`mailto:${draft.email}`}
              className="mt-1 block truncate text-sm font-semibold text-[#166534] underline dark:text-emerald-300"
            >
              {draft.email}
            </a>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-medium text-[#166534] dark:text-emerald-300 sm:justify-start">
              <span>{draft.country}</span>
              <span>{draft.phone}</span>
            </div>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={startEditing}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#166534] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] dark:bg-[#111b16] dark:hover:bg-[#18291f] sm:mt-0 sm:w-auto sm:text-[15px]"
            >
              <Edit className="h-4 w-4" aria-hidden="true" />
              Edit Profile
            </button>
          ) : (
            <div className="mt-4 flex w-full gap-2 sm:mt-0 sm:w-auto">
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:flex-none"
              >
                <X className="h-4 w-4" aria-hidden="true" /> Cancel
              </button>
              <button
                type="button"
                onClick={saveChanges}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#166534] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] dark:bg-[#111b16] dark:hover:bg-[#18291f] sm:flex-none"
              >
                <Save className="h-4 w-4" aria-hidden="true" /> Save
              </button>
            </div>
          )}
        </section>

        <div className="grid items-start gap-5 min-[1200px]:grid-cols-[1.8fr_1fr]">
          <section
            className="rounded-xl border border-gray-200 bg-card p-5 sm:p-6"
            aria-labelledby="personal-information-title"
          >
            <h2
              id="personal-information-title"
              className="mb-5 border-b border-gray-200 pb-4 text-lg font-medium text-foreground dark:border-border"
            >
              Personal Information
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField
                  label="First Name"
                  value={draft.firstName}
                  editable={isEditing}
                  onChange={(value) => updateField("firstName", value)}
                />
                <ProfileField
                  label="Second Name"
                  value={draft.lastName}
                  editable={isEditing}
                  onChange={(value) => updateField("lastName", value)}
                />
              </div>
              <ProfileField
                label="Email"
                type="email"
                value={draft.email}
                editable={isEditing}
                onChange={(value) => updateField("email", value)}
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ProfileField
                  label="Phone"
                  value={draft.phone}
                  editable={isEditing}
                  onChange={(value) => updateField("phone", value)}
                />
                <ProfileField
                  label="Date of Birth"
                  value={draft.dateOfBirth}
                  editable={isEditing}
                  onChange={(value) => updateField("dateOfBirth", value)}
                />
              </div>
              <ProfileField
                label="Country"
                value={draft.country}
                editable={isEditing}
                onChange={(value) => updateField("country", value)}
                uppercase
              />
            </div>
          </section>

          <aside className="flex flex-col gap-5">
            <section
              className="rounded-xl border border-gray-200 bg-card p-5 sm:p-6"
              aria-labelledby="account-status-title"
            >
              <h2
                id="account-status-title"
                className="mb-5 border-b border-gray-200 pb-4 text-lg font-medium text-foreground dark:border-border"
              >
                Account Status
              </h2>
              <dl className="flex flex-col gap-4">
                <StatusRow label="Account Type" value="Tutor" />
                <StatusRow label="Status" value="ACTIVE" />
                <StatusRow label="Tutor ID" value="TTR-0992" />
                <StatusRow label="Member Since" value="12/03/2026" last />
              </dl>
            </section>

            <section
              className="rounded-xl border border-gray-200 bg-card p-5 sm:p-6"
              aria-labelledby="profile-bio-title"
            >
              <h2
                id="profile-bio-title"
                className="mb-4 border-b border-gray-200 pb-4 text-lg font-medium text-foreground dark:border-border"
              >
                BIOS
              </h2>
              {isEditing ? (
                <textarea
                  aria-label="Bio"
                  value={draft.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  rows={5}
                  className={`${fieldClassName} resize-y`}
                />
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">{profile.bio}</p>
              )}
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function ProfileField({
  label,
  value,
  type = "text",
  editable,
  onChange,
  uppercase = false,
}: {
  label: string;
  value: string;
  type?: string;
  editable: boolean;
  onChange: (value: string) => void;
  uppercase?: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-col">
      <span className="mb-2 text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        readOnly={!editable}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className={`${fieldClassName} ${uppercase ? "uppercase" : ""}`}
      />
    </label>
  );
}

function StatusRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 pb-3 ${
        last ? "" : "border-b border-gray-200 dark:border-border"
      }`}
    >
      <dt className="text-sm font-semibold text-[#166534] dark:text-emerald-300">
        {label}
      </dt>
      <dd className="text-right text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

export default TutorSettings;
