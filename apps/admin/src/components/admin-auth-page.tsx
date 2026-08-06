import { Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, Shield, ShieldCheck, Users } from "lucide-react";
import { Logo } from "@/components/logo";

export function AdminAuthPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f3f7fb_100%)] text-slate-950">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Logo />
        <Link to="/" className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
          Back home
        </Link>
      </div>

      <main className="mx-auto grid min-h-[calc(100vh-88px)] max-w-[1280px] gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-16">
        <section className="flex items-center">
          <div className="w-full rounded-[36px] border border-slate-200 bg-white/90 p-6 shadow-[0_36px_100px_-60px_rgba(148,163,184,0.45)] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-800">
              <Shield className="h-3.5 w-3.5" />
              Administrative access
            </div>
            <h1 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-[54px]">
              Protect operations with a dedicated admin sign-in.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-slate-600">
              This access point is separated for governance and oversight. Review support queues, audit events, approvals, and platform settings from a page meant only for administrators.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                { icon: ClipboardCheck, title: "Approvals", copy: "Review tutor, course, and category changes before publishing." },
                { icon: Users, title: "Operations", copy: "Manage learners, support issues, roles, and reports after login." },
                { icon: ShieldCheck, title: "Audit", copy: "Keep privileged activity isolated from standard portal access." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-800">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-slate-950">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[36px] border border-slate-200 bg-white p-6 shadow-[0_42px_110px_-60px_rgba(148,163,184,0.45)] sm:p-8 lg:p-10">
            <p className="text-sm font-medium text-slate-500">Restricted platform control</p>
            <h2 className="mt-1 text-[30px] font-semibold tracking-tight text-slate-950">Admin sign in</h2>

            <form className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-slate-800">
                Admin email
                <input
                  type="email"
                  defaultValue="elena.rossi@techbridge.io"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/15"
                />
              </label>

              <label className="block text-sm font-medium text-slate-800">
                Password
                <input
                  type="password"
                  defaultValue="admin-demo"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/15"
                />
              </label>

              <label className="block text-sm font-medium text-slate-800">
                Verification code
                <input
                  type="text"
                  defaultValue="803271"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/15"
                />
              </label>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
                Two-step verification is shown here to keep admin access visually and functionally distinct from the student and tutor flows.
              </div>

              <Link
                to="/admin/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
              >
                Enter admin workspace <ArrowRight className="h-4 w-4" />
              </Link>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}