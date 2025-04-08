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
