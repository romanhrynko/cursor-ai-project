import { supabase } from '@/lib/supabaseClient';
import { ApiKey } from '@/types/api';

export async function fetchApiKeys(): Promise<{ data: ApiKey[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: true });
  return { data: data || null, error: error ? error.message : null };
}

export async function createApiKey(payload: Partial<ApiKey>): Promise<{ data: ApiKey[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('api_keys')
    .insert([payload])
    .select();
  return { data: data || null, error: error ? error.message : null };
}

export async function updateApiKey(id: string, payload: Partial<ApiKey>): Promise<{ data: ApiKey[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('api_keys')
    .update(payload)
    .eq('id', id)
    .select();
  return { data: data || null, error: error ? error.message : null };
}

export async function deleteApiKey(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id);
  return { error: error ? error.message : null };
} 