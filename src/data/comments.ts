export interface CommentType {
  id: number;
  user: {
    name: string;
    profile_pic?: string;
  };
  text?: string;
  createdAt?: string;
  likes?: number;
}

export const comments: CommentType[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      profile_pic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    text: "This is an amazing post! Really loved the insights.",
    createdAt: "2025-03-21T10:15:30Z",
    likes: 12,
  },
  {
    id: 2,
    user: {
      name: "Emma Watson",
      profile_pic: "https://randomuser.me/api/portraits/women/2.jpg",
    },

    text: "I disagree with some points, but overall a great read!",
    createdAt: "2025-03-21T11:05:20Z",
    likes: 8,
  },
  {
    id: 3,
    user: {
      name: "Liam Johnson",
      profile_pic: "https://randomuser.me/api/portraits/men/3.jpg",
    },

    text: "Can you share more details on this topic?",
    createdAt: "2025-03-21T12:30:10Z",
    likes: 5,
  },
  {
    id: 4,
    user: {
      name: "Sophia Lee",
      profile_pic: "https://randomuser.me/api/portraits/women/4.jpg",
    },

    text: "Nice explanation! Helped me understand the concept better.",
    createdAt: "2025-03-21T13:45:55Z",
    likes: 15,
  },
];
