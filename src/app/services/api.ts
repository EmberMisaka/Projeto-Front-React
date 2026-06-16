import axios from 'axios';

const API_BASE = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3000';

export type BackendRole = 'contratante' | 'provedor' | 'ADM';

// ── Auth ──────────────────────────────────────────────────────────────────────
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

// ── Serviços ──────────────────────────────────────────────────────────────────
export interface CriarServicoPayload {
  titulo: string;
  descricao: string;
  preco: number;
  prazoDias: number;
}

export interface Servico {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  prazoDias: number;
  provedorId: number;
  criadoEm: string;
}

// ── Pedidos ───────────────────────────────────────────────────────────────────
export interface Pedido {
  id: number;
  servicoId: number;
  contratanteId: number;
  status: string;
  criadoEm: string;
}

export interface PagarPedidoResponse {
  mensagem: string;
  link_do_pagamento: string;
  pedido: Pedido;
}

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Usuarios ──────────────────────────────────────────────────────────────────
export async function cadastrar(data: RegisterPayload): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>('/usuarios/cadastro', data);
  return res.data;
}

export async function fazerLogin(data: LoginPayload): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/usuarios/login', data);
  return res.data;
}

// ── Serviços ──────────────────────────────────────────────────────────────────
export async function criarServico(data: CriarServicoPayload): Promise<{ mensagem: string; servico: Servico }> {
  const res = await api.post<{ mensagem: string; servico: Servico }>('/servicos', data);
  return res.data;
}

// ── Pedidos ───────────────────────────────────────────────────────────────────
export async function criarPedido(servicoId: number): Promise<{ mensagem: string; pedido: Pedido }> {
  const res = await api.post<{ mensagem: string; pedido: Pedido }>('/pedidos', { servicoId });
  return res.data;
}

export async function pagarPedido(pedidoId: number): Promise<PagarPedidoResponse> {
  const res = await api.patch<PagarPedidoResponse>(`/pedidos/${pedidoId}/pagar`);
  return res.data;
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export async function listarServicosAdmin(): Promise<{ total: number; servicos: Servico[] }> {
  const res = await api.get<{ mensagem: string; total: number; servicos: Servico[] }>('/admin/servicos');
  return res.data;
}

export async function deletarServicoAdmin(id: number): Promise<void> {
  await api.delete(`/admin/servicos/${id}`);
}

// ── JWT helper ────────────────────────────────────────────────────────────────
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as JWTPayload;
  } catch {
    return null;
  }
}

export default api;
