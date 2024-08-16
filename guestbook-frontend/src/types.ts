export interface BookMessage {
  message: string;
  image: string | null;
  author: string | null;
}

export interface BookMessageMutation {
  message: string;
  image: File | null;
  author: string | null;
}
