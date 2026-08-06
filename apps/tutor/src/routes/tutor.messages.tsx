import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";

export const Route = createFileRoute("/tutor/messages")({
  component: Messages,
});

const threads = [
  { n: "Marcus Reid", m: "Quick question about the assignment…", t: "2m", unread: true },
  { n: "Yuki Tanaka", m: "Thanks for the feedback!", t: "1h", unread: false },
  { n: "Chen Wei", m: "Can we schedule office hours?", t: "3h", unread: true },
  { n: "Aisha Bello", m: "The subnetting quiz was tough.", t: "1d", unread: false },
];

function Messages() {
  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8">
      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[320px_1fr]">
        <aside className="border-r border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="text-[16px] font-semibold">Messages</h3>
          </div>
          <ul>
            {threads.map((t, i) => (
              <li key={t.n} className={`flex cursor-pointer items-start gap-3 border-b border-border p-4 hover:bg-secondary/50 ${i === 0 ? "bg-secondary/70" : ""}`}>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {t.n.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold">{t.n}</div>
                    <div className="text-[10px] text-muted-foreground">{t.t}</div>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{t.m}</div>
                </div>
                {t.unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </li>
            ))}
          </ul>
        </aside>
        <section className="flex flex-col bg-background">
          <div className="border-b border-border bg-card px-6 py-4">
            <div className="text-sm font-semibold">Marcus Reid</div>
            <div className="text-xs text-muted-foreground">Ethical Hacking · Active now</div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            <div className="flex justify-start"><div className="max-w-md rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-sm">Hi Priya — I finished the recon assignment but I'm getting inconsistent Nmap results.</div></div>
            <div className="flex justify-end"><div className="max-w-md rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">That's usually rate-limiting. Try adding <span className="font-mono text-xs">-T2</span> and share the output.</div></div>
            <div className="flex justify-start"><div className="max-w-md rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-sm">Ah that worked. Thanks!</div></div>
          </div>
          <div className="border-t border-border bg-card p-4">
            <div className="flex gap-2">
              <input placeholder="Type a message…" className="flex-1 rounded-[14px] border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary" />
              <button className="inline-flex items-center gap-1.5 rounded-[14px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Send className="h-4 w-4" />Send</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
