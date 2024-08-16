export interface IBookMessage {
  id: string;
  message: string;
}

export type BookMessageMutation = {
  message: string;
  image: string | null;
  author: string | null;
};
