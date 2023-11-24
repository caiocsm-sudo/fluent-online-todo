// maybe deprecated

export default interface TodoListInterface {
  id?: string;
  title: string;
  description: string;
  progress: number;
  user_email: string | null;
  date?: string;
}
