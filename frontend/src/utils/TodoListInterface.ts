export default interface TodoListInterface {
  id?: string;
  title: string;
  description: string;
  progress: number;
  completed?: boolean;
  date?: string;
}