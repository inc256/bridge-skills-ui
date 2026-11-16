export interface ForumMessage {
  id: string;
  author: string;
  initials: string;
  time: string;
  content: string;
  isCurrentUser?: boolean;
}

export interface ForumDiscussion {
  id: string;
  forumId: string;
  forumTitle: string;
  title: string;
  updatedAt: string;
  messages: ForumMessage[];
}

export interface ForumCourse {
  id: string;
  title: string;
  avatarInitials: string;
  updatedAt: string;
  previewAuthor: string;
  preview: string;
  discussions: ForumDiscussion[];
}

function createForumCourse(
  id: string,
  title: string,
  avatarInitials: string,
  discussions: ForumDiscussion[],
): ForumCourse {
  const latestDiscussion = discussions[0];
  const firstMessage = latestDiscussion?.messages[0];
  return {
    id,
    title,
    avatarInitials,
    updatedAt: latestDiscussion?.updatedAt ?? "",
    previewAuthor: latestDiscussion?.title ?? "",
    preview: firstMessage?.content ?? "",
    discussions,
  };
}

let forums: ForumCourse[] = [
  createForumCourse("python", "Introduction to Python", "PY", [
    {
      id: "python-class-view",
      forumId: "python",
      forumTitle: "Introduction to Python",
      title: "Class View",
      updatedAt: "14:09",
      messages: [
        { id: "python-class-view-1", author: "Tonny K", initials: "TK", time: "14:09", content: "Hello Guys" },
        { id: "python-class-view-2", author: "Mubarak", initials: "M", time: "14:12", content: "Hi everyone! What did you think of today's class?", isCurrentUser: true },
      ],
    },
    {
      id: "python-homework",
      forumId: "python",
      forumTitle: "Introduction to Python",
      title: "Home Work",
      updatedAt: "09:12",
      messages: [
        { id: "python-homework-1", author: "Kevin", initials: "K", time: "09:12", content: "Lets Get It!" },
        { id: "python-homework-2", author: "Aisha Bello", initials: "AB", time: "09:20", content: "I am starting with the loops exercise. Good luck, everyone!" },
      ],
    },
    {
      id: "python-exams",
      forumId: "python",
      forumTitle: "Introduction to Python",
      title: "Exams Discussion",
      updatedAt: "11:12",
      messages: [
        { id: "python-exams-1", author: "Ronny", initials: "R", time: "11:12", content: "Okay" },
        { id: "python-exams-2", author: "Mubarak", initials: "M", time: "11:17", content: "I found the practice quiz useful for reviewing functions.", isCurrentUser: true },
      ],
    },
    {
      id: "python-just-talks",
      forumId: "python",
      forumTitle: "Introduction to Python",
      title: "Just Talks",
      updatedAt: "10:00",
      messages: [
        { id: "python-just-talks-1", author: "Mubarak", initials: "M", time: "10:00", content: "Yap?", isCurrentUser: true },
        { id: "python-just-talks-2", author: "Tonny K", initials: "TK", time: "10:06", content: "All good here. Looking forward to the next lesson!" },
      ],
    },
  ]),
  createForumCourse("ai-ml", "Introduction to AI & ML", "AI", [
    {
      id: "ai-first-model",
      forumId: "ai-ml",
      forumTitle: "Introduction to AI & ML",
      title: "Choosing a first model",
      updatedAt: "09:12",
      messages: [
        { id: "ai-first-model-1", author: "Kevin", initials: "K", time: "09:12", content: "Lets Get It!" },
        { id: "ai-first-model-2", author: "Mubarak", initials: "M", time: "09:26", content: "Starting with a simple baseline made the results much easier to understand.", isCurrentUser: true },
      ],
    },
    {
      id: "ai-study-group",
      forumId: "ai-ml",
      forumTitle: "Introduction to AI & ML",
      title: "Weekend study group",
      updatedAt: "Yesterday",
      messages: [
        { id: "ai-study-group-1", author: "Anya", initials: "A", time: "Yesterday", content: "Anyone reviewing the model evaluation lesson this weekend?" },
      ],
    },
  ]),
  createForumCourse("computer-science", "Diploma In Computer Science", "CS", [
    {
      id: "cs-exams",
      forumId: "computer-science",
      forumTitle: "Diploma In Computer Science",
      title: "Exams Discussion",
      updatedAt: "11:12",
      messages: [
        { id: "cs-exams-1", author: "Ronny", initials: "R", time: "11:12", content: "Okay" },
        { id: "cs-exams-2", author: "Yuki Tanaka", initials: "YT", time: "11:31", content: "The revision checklist helped me organize the topics." },
      ],
    },
    {
      id: "cs-projects",
      forumId: "computer-science",
      forumTitle: "Diploma In Computer Science",
      title: "Project check-in",
      updatedAt: "Yesterday",
      messages: [
        { id: "cs-projects-1", author: "Mubarak", initials: "M", time: "Yesterday", content: "I have pushed the latest project outline for feedback.", isCurrentUser: true },
      ],
    },
  ]),
  createForumCourse("office-apps", "Degree in Office Applications", "OA", [
    {
      id: "office-just-talks",
      forumId: "office-apps",
      forumTitle: "Degree in Office Applications",
      title: "Just Talks",
      updatedAt: "10:00",
      messages: [
        { id: "office-just-talks-1", author: "Mubarak", initials: "M", time: "10:00", content: "Yap?", isCurrentUser: true },
        { id: "office-just-talks-2", author: "Aisha Bello", initials: "AB", time: "10:14", content: "Does anyone have a shortcut for formatting the whole table?" },
      ],
    },
  ]),
];

export function getMockForumCourses() {
  return forums;
}

export function findMockForumDiscussion(discussionId: string) {
  return forums.flatMap((forum) => forum.discussions).find((discussion) => discussion.id === discussionId);
}

export function createMockForumDiscussion(forumId: string, title: string, content: string) {
  const forum = forums.find((item) => item.id === forumId);
  if (!forum) return null;

  const discussion: ForumDiscussion = {
    id: `discussion-${Date.now()}`,
    forumId: forum.id,
    forumTitle: forum.title,
    title,
    updatedAt: "Now",
    messages: [
      {
        id: `message-${Date.now()}`,
        author: "Mubarak",
        initials: "M",
        time: "Now",
        content,
        isCurrentUser: true,
      },
    ],
  };
  const updatedForum = {
    ...forum,
    updatedAt: "Now",
    previewAuthor: "Mubarak",
    preview: content,
    discussions: [discussion, ...forum.discussions],
  };
  forums = forums.map((item) => item.id === forum.id ? updatedForum : item);
  return discussion;
}

export function addMockForumReply(discussionId: string, content: string) {
  let createdMessage: ForumMessage | null = null;
  forums = forums.map((forum) => {
    const discussion = forum.discussions.find((item) => item.id === discussionId);
    if (!discussion) return forum;

    const reply: ForumMessage = {
      id: `message-${Date.now()}`,
      author: "Mubarak",
      initials: "M",
      time: "Now",
      content,
      isCurrentUser: true,
    };
    createdMessage = reply;
    const updatedDiscussion = {
      ...discussion,
      updatedAt: "Now",
      messages: [...discussion.messages, reply],
    };
    return {
      ...forum,
      updatedAt: "Now",
      previewAuthor: "Mubarak",
      preview: content,
      discussions: [updatedDiscussion, ...forum.discussions.filter((item) => item.id !== discussionId)],
    };
  });
  return createdMessage;
}
