import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MessageCircle, MoreVertical, Search, Users, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  createMockForumDiscussion,
  getMockForumCourses,
  type ForumCourse,
} from "@/lib/mock-forum";

export const Route = createFileRoute("/student/forum/")({
  component: CourseForums,
});

function CourseForums() {
  const [forums, setForums] = useState<ForumCourse[]>(getMockForumCourses);
  const [selectedForumId, setSelectedForumId] = useState(() => getMockForumCourses()[0]?.id ?? "");
  const [mobileView, setMobileView] = useState<"courses" | "discussions">("courses");
  const [query, setQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicContent, setTopicContent] = useState("");
  const [composerError, setComposerError] = useState("");
  const search = query.trim().toLowerCase();
  const visibleForums = forums.filter((forum) => (
    forum.title.toLowerCase().includes(search)
    || forum.preview.toLowerCase().includes(search)
    || forum.previewAuthor.toLowerCase().includes(search)
  ));
  const selectedForum = visibleForums.find((forum) => forum.id === selectedForumId) ?? visibleForums[0];

  function handleCreateDiscussion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedForum) {
      setComposerError("Select a course forum first.");
      return;
    }
    if (!topicTitle.trim() || !topicContent.trim()) {
      setComposerError("Enter both a topic and a message.");
      return;
    }

    const created = createMockForumDiscussion(selectedForum.id, topicTitle.trim(), topicContent.trim());
    if (!created) {
      setComposerError("Could not start this discussion. Please try again.");
      return;
    }

    setForums(getMockForumCourses());
    setSelectedForumId(selectedForum.id);
    setTopicTitle("");
    setTopicContent("");
    setComposerError("");
    setShowComposer(false);
  }

  return (
    <div className="h-full min-h-0 w-full">
      <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-card min-[901px]:flex-row">
        <aside className={`${mobileView === "discussions" ? "hidden min-[901px]:flex" : "flex"} h-full min-h-0 w-full shrink-0 flex-col border-b border-border bg-card min-[901px]:h-auto min-[901px]:w-[380px] min-[901px]:min-h-0 min-[901px]:border-b-0 min-[901px]:border-r`}>
          <label className="relative block border-b border-border p-4 sm:p-5">
            <Search className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search course forums"
              placeholder="Search for Course Forum!"
              className="w-full rounded-lg border-2 border-[#166534] bg-background py-3 pl-11 pr-10 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-[#166534]/20 sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear forum search"
                className="absolute right-7 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </label>

          <div className="min-h-0 flex-1 overflow-y-auto" aria-label="Course forums">
            {visibleForums.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">No course forums found.</p>
            ) : visibleForums.map((forum) => (
              <button
                key={forum.id}
                type="button"
                onClick={() => {
                  setSelectedForumId(forum.id);
                  setMobileView("discussions");
                }}
                aria-pressed={selectedForum?.id === forum.id}
                className={`flex w-full items-center border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary/50 sm:px-5 sm:py-4 ${
                  selectedForum?.id === forum.id ? "bg-[#166534]/5" : "bg-card"
                }`}
              >
                <span className="mr-3 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-[#166534] dark:text-emerald-300 sm:mr-4 sm:h-[50px] sm:w-[50px]">
                  {forum.avatarInitials}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-foreground">{forum.title}</span>
                    <time className="shrink-0 text-[11px] text-muted-foreground sm:text-xs">{forum.updatedAt}</time>
                  </span>
                  <span className="truncate text-xs text-muted-foreground sm:text-sm">
                    {forum.previewAuthor}: {forum.preview}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section
          className={`${mobileView === "courses" ? "hidden min-[901px]:flex" : "flex"} min-h-0 min-w-0 flex-1 flex-col bg-card`}
          aria-label="Selected course forum"
        >
          {selectedForum ? (
            <>
              <header className="relative flex shrink-0 flex-col items-center bg-[#166534] px-4 py-5 text-center text-white dark:bg-[#111b16] sm:py-7">
                <button
                  type="button"
                  onClick={() => setMobileView("courses")}
                  aria-label="Back to course forums"
                  className="absolute left-3 top-3 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 min-[901px]:hidden"
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Forum options"
                  className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-5"
                >
                  <MoreVertical className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="mb-3 grid h-16 w-16 place-items-center rounded-full border-[3px] border-emerald-300/60 bg-white/10 text-lg font-semibold text-white sm:mb-4 sm:h-[90px] sm:w-[90px] sm:text-xl">
                  {selectedForum.avatarInitials}
                </div>
                <h1 className="text-xl font-semibold tracking-wide sm:text-[26px]">{selectedForum.title}</h1>
                <p className="mb-4 mt-1 text-xs text-white/75 sm:mb-6 sm:text-sm">
                  Community <span className="mx-2">·</span> {selectedForum.discussions.length} Discussions
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setComposerError("");
                    setShowComposer(true);
                  }}
                  className="rounded-full bg-[#166534] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] dark:bg-[#111b16] dark:hover:bg-[#18291f] sm:px-10 sm:py-3 sm:text-base"
                >
                  Start a Discussion
                </button>
              </header>

              {showComposer && (
                <div className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4" role="presentation">
                  <form
                    onSubmit={handleCreateDiscussion}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="new-discussion-title"
                    className="w-full max-w-lg space-y-4 rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 id="new-discussion-title" className="text-lg font-semibold text-foreground">Start a Discussion</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{selectedForum.title}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowComposer(false)}
                        aria-label="Close discussion form"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <label className="block space-y-1.5">
                      <span className="text-sm font-medium text-foreground">Topic</span>
                      <input
                        value={topicTitle}
                        onChange={(event) => setTopicTitle(event.target.value)}
                        maxLength={120}
                        required
                        placeholder="What would you like to discuss?"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                      />
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-sm font-medium text-foreground">Message</span>
                      <textarea
                        value={topicContent}
                        onChange={(event) => setTopicContent(event.target.value)}
                        rows={4}
                        required
                        placeholder="Add a little context for the community..."
                        className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                      />
                    </label>
                    {composerError && <p role="alert" className="text-sm text-destructive">{composerError}</p>}
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowComposer(false)}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full bg-[#166534] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] dark:bg-[#111b16] dark:hover:bg-[#18291f]"
                      >
                        Start discussion <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="min-h-0 flex-1 overflow-y-auto" aria-label={`${selectedForum.title} discussions`}>
                {selectedForum.discussions.map((discussion) => {
                  const opener = discussion.messages[0];
                  const latestMessage = discussion.messages[discussion.messages.length - 1];
                  const replyCount = Math.max(discussion.messages.length - 1, 0);
                  return (
                    <Link
                      key={discussion.id}
                      to="/student/forum/$discussionId"
                      params={{ discussionId: discussion.id }}
                      className="flex items-center gap-3 border-b border-border px-4 py-4 transition-colors hover:bg-secondary/40 sm:gap-4 sm:px-7 sm:py-6"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-primary sm:h-[50px] sm:w-[50px]">
                        {opener?.initials ?? "TB"}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="mb-1.5 truncate text-sm font-medium text-foreground sm:text-base">{discussion.title}</span>
                        <span className="truncate text-xs text-muted-foreground sm:text-[15px]">
                          {latestMessage?.author}: {latestMessage?.content}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-col items-end gap-2">
                        <time className="text-[11px] text-muted-foreground sm:text-sm">{discussion.updatedAt}</time>
                        {replyCount > 0 && (
                          <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-[#166534] text-[11px] font-semibold text-white dark:bg-[#111b16]">
                            {replyCount}
                          </span>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="grid flex-1 place-items-center p-8 text-center">
              <div>
                <Users className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden="true" />
                <p className="mt-3 font-medium text-foreground">No matching course forums</p>
                <p className="mt-1 text-sm text-muted-foreground">Try another search.</p>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
