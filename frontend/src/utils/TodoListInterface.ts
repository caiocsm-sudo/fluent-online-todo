export default interface TodoListInterface {
  id?: string;
  title: string;
  description: string;
  progress: number;
  completed?: boolean;
  user_email: string;
  date?: string;
}