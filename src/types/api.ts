export interface ApiKey {
  id: string;
  name: string;
  value: string;
  usage: number;
  limit?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface ApiKeyForm {
  name: string;
  value: string;
}

export type ModalType = 
  | { type: "create" }
  | { type: "edit"; key: ApiKey }
  | { type: "delete"; key: ApiKey }
  | null;

export interface Toast {
  message: string;
  type: 'success' | 'error';
} 