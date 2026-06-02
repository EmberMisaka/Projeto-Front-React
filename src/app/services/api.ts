import axios from 'axios';

const API_BASE = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3000';

export type BackendRole = 'contratante' | 'provedor' | 'ADM';

export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
  role: BackendRole;
  tecnologias?: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface RegisterResponse {
  mensagem: string;
  usuario: { id: number; nome: string; role: BackendRole };
}

export interface LoginResponse {
  mensage: string;
  token: string;
}

export interface JWTPayload {
  id: number;
  role: BackendRole;
  iat: number;
  exp: number;
}

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export async function cadastrar(data: RegisterPayload): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>('/usuarios/cadastro', data);
  return res.data;
}

export async function fazerLogin(data: LoginPayload): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/usuarios/login', data);
  return res.data;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as JWTPayload;
  } catch {
    return null;
  }
}

export default api;
