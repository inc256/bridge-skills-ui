import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, Award, Crown, Flame, Trophy } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getGamificationSummary, getLeaderboard } from "@/lib/api";

export const Route = createFileRoute("/student/achievements")({
  component: Achievements,
});

function Achievements() {
  const [badges, setBadges] = useState<any[]>([]);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([getGamificationSummary(), getLeaderboard()])
      .then(([badgePayload, leaderboard]) => {
        if (cancelled) return;
        const badgeList = Array.isArray(badgePayload)
          ? badgePayload
          : badgePayload?.badges ?? badgePayload?.earned_badges ?? badgePayload?.results ?? badgePayload?.data ?? [];
        setBadges(Array.isArray(badgeList) ? badgeList : []);
        setLeaders(Array.isArray(leaderboard) ? leaderboard : []);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Could not load achievements.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="mx-auto max-w-6xl p-4 sm:p-6"><PageSkeleton rows={4} /></div>;

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600"><Trophy className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Achievements</h1>
            <p className="mt-1 text-sm text-muted-foreground">Celebrate your learning milestones and see how you rank in the community.</p>
          </div>
        </div>
      </header>

      {error && <div role="alert" className="flex gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <section className="rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border p-4 sm:p-5">
            <Award className="h-5 w-5 text-amber-500" />
            <h2 className="font-semibold">My badges</h2>
            <span className="ml-auto rounded-full bg-muted px-2.5 py-1 text-xs">{badges.length} earned</span>
          </div>
          {badges.length === 0 ? (
            <div className="p-8 text-center">
              <Flame className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">Your first badge is waiting</p>
              <p className="mt-1 text-xs text-muted-foreground">Complete lessons and courses to earn achievements.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {badges.map((badge, index) => {
                const name = badge.name ?? badge.title ?? badge.badge?.name ?? `Achievement ${index + 1}`;
                return (
                  <li key={badge.id ?? index} className="flex items-center gap-3 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600"><Award className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block font-medium">{name}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{badge.description ?? badge.badge?.description ?? badge.earned_at ?? "Earned achievement"}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border p-4 sm:p-5">
            <Crown className="h-5 w-5 text-amber-500" />
            <h2 className="font-semibold">Learner leaderboard</h2>
            <span className="ml-auto text-xs text-muted-foreground">Top learners</span>
          </div>
          {leaders.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">The leaderboard is not available yet.</p>
          ) : (
            <ol className="divide-y divide-border">
              {leaders.slice(0, 50).map((leader, index) => (
                <li key={leader.id ?? leader.user_id ?? index} className="flex items-center gap-3 p-3.5 sm:p-4">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${index < 3 ? "bg-amber-500/10 text-amber-700" : "bg-muted text-muted-foreground"}`}>{index + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-medium">{leader.full_name ?? leader.name ?? leader.username ?? "Learner"}</span>
                  <span className="text-sm font-semibold">{leader.xp ?? leader.total_xp ?? leader.points ?? 0} XP</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </main>
  );
}
