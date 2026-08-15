import { createFileRoute } from "@tanstack/react-router";
import { FileEdit, ChevronRight, Home, Users, Briefcase, HelpCircle, Megaphone, Layers } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

const CONTENT_SECTIONS = [
  { 
    key: 'homepage', 
    icon: Home, 
    label: 'Homepage', 
    desc: 'Hero, learning paths, featured courses, testimonials.', 
    count: '5 sections',
    color: '#3B82F6', 
    bg: '#EFF6FF' 
  },
  { 
    key: 'testimonials', 
    icon: Users, 
    label: 'Testimonials', 
    desc: 'Curate learner stories shown on the marketing site.', 
    count: '12 published',
    color: '#16a34a', 
    bg: '#F0FDF4' 
  },
  { 
    key: 'partners', 
    icon: Briefcase, 
    label: 'Partners', 
    desc: 'Manage the trusted-by logos.', 
    count: '6 partners',
    color: '#8B5CF6', 
    bg: '#EDE9FE' 
  },
  { 
    key: 'faqs', 
    icon: HelpCircle, 
    label: 'FAQs', 
    desc: 'Support and product FAQs.', 
    count: '34 entries',
    color: '#F59E0B', 
    bg: '#FFF7ED' 
  },
  { 
    key: 'announcements', 
    icon: Megaphone, 
    label: 'Announcements', 
    desc: 'Platform-wide banners and system notices.', 
    count: '1 active',
    color: '#EF4444', 
    bg: '#FEF2F2' 
  },
  { 
    key: 'learning_paths', 
    icon: Layers, 
    label: 'Learning paths', 
    desc: 'Configure track structure and metadata.', 
    count: '4 paths',
    color: '#14B8A6', 
    bg: '#F0FDFA' 
  },
];

function AdminContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight">Content management</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage the public marketing surface of TechBridge.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CONTENT_SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <button 
              key={s.key} 
              className="card-surface card-hover flex items-center gap-4 p-5 text-left transition-all hover:shadow-md hover:border-primary/20"
            >
              <div 
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ background: s.bg }}
              >
                <Icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
                <div className="mt-1 text-[11px] font-medium" style={{ color: s.color }}>{s.count}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}