export type MessageType = 'text' | 'image' | 'file';

export interface AIResponse {
  id: string;
  text: string;
  loading?: boolean;
}