import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, MessageCircle, Paperclip, Send, Users } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { ForumDiscussion, ForumMessage } from "@/lib/mock-forum";
import { addMockForumReply, findMockForumDiscussion } from "@/lib/mock-forum";

export const Route = createFileRoute("/student/forum/$discussionId")({
  component: ForumDiscussionPage,
});

function ForumDiscussionPage() {
  const { discussionId } = Route.useParams();
  const discussion = findMockForumDiscussion(discussionId);

  if (!discussion) {
    return (
      <section className="grid h-full min-h-0 w-full place-items-center border border-border bg-card p-8 text-center">
        <MessageCircle className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-3 text-lg font-semibold">Discussion not found</h1>
        <Link to="/student/forum" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to course forums
        </Link>
      </section>
    );
  }

  return <DiscussionConversation key={discussion.id} discussion={discussion} />;
}

function DiscussionConversation({ discussion }: { discussion: ForumDiscussion }) {
  const [messages, setMessages] = useState<ForumMessage[]>(discussion.messages);
  const [draft, setDraft] = useState("");
  const [replyError, setReplyError] = useState("");
  const attachmentInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setDraft((current) => `${current}${current ? " " : ""}[Attachment: ${file.name}]`);
    }
    event.target.value = "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    const created = addMockForumReply(discussion.id, content);
    if (!created) {
      setReplyError("Could not post your reply. Please try again.");
      return;
    }

    setMessages((current) => [...current, created]);
    setReplyError("");
    setDraft("");
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-card" aria-label="Discussion conversation">
      <header className="flex shrink-0 items-center gap-3 bg-[#166534] px-3 py-3 text-white dark:bg-[#111b16] sm:px-6 sm:py-4">
        <Link
          to="/student/forum"
          aria-label="Back to course forums"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </Link>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white/30 bg-white/10 text-xs font-semibold">
          {discussion.messages[0]?.initials ?? "TB"}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold sm:text-[22px]">{discussion.title}</h1>
          <p className="truncate text-xs text-white/70">{discussion.forumTitle}</p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 text-xs text-white/75 sm:inline-flex">
          <Users className="h-4 w-4" aria-hidden="true" />
          {Math.max(messages.length, 2)} Online
        </span>
      </header>

      <div className="flex min-h-0 flex-1 flex-col bg-card">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-card p-3 sm:space-y-5 sm:p-6" aria-label="Discussion messages">
          {messages.map((message) => {
            const isCurrentUser = Boolean(message.isCurrentUser);
            return (
              <div key={message.id} className={`flex w-full ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                <article className={`relative min-w-0 max-w-[90%] rounded-xl px-3 py-2.5 sm:max-w-[75%] sm:px-4 sm:py-3 ${
                  isCurrentUser
                    ? "rounded-tr-sm bg-[#166534] text-white dark:bg-[#111b16]"
                    : "rounded-tl-sm border border-border bg-card text-foreground"
                }`}>
                  <div className="mb-1.5 flex items-center gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/5 text-[9px] font-semibold">
                      {message.initials}
                    </span>
                    <span className="text-xs font-semibold">{isCurrentUser ? "You" : message.author}</span>
                    <time className={`ml-auto text-[10px] ${isCurrentUser ? "text-white/70" : "text-muted-foreground"}`}>
                      {message.time}
                    </time>
                  </div>
                  <p className="break-words whitespace-pre-wrap pl-9 text-sm leading-relaxed">{message.content}</p>
                </article>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="shrink-0 border-t border-border bg-card p-3 pb-0 sm:p-4">
          {replyError && <p role="alert" className="mb-2 px-1 text-xs text-destructive">{replyError}</p>}
          <div className="flex items-center gap-2 sm:gap-3">
            <input ref={imageInput} type="file" accept="image/*" className="sr-only" onChange={handleAttachmentChange} />
            <input ref={attachmentInput} type="file" className="sr-only" onChange={handleAttachmentChange} />
            <button
              type="button"
              onClick={() => imageInput.current?.click()}
              aria-label="Attach an image"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary sm:h-10 sm:w-10"
            >
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => attachmentInput.current?.click()}
              aria-label="Attach a file"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary sm:h-10 sm:w-10"
            >
              <Paperclip className="h-4 w-4" aria-hidden="true" />
            </button>
            <label className="sr-only" htmlFor="forum-reply">Write a reply</label>
            <input
              id="forum-reply"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none transition focus:ring-2 focus:ring-[#166534]/20 sm:py-3 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send reply"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#166534] text-white transition-colors hover:bg-[#14532d] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#111b16] dark:hover:bg-[#18291f] sm:h-11 sm:w-11"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
