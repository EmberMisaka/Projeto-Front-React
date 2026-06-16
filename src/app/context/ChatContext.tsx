import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice?: number;
  pedidoId?: number;
  providerId: string;
  providerName: string;
  providerAvatar?: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

export interface CreateConversationMeta {
  serviceName?: string;
  servicePrice?: number;
  providerName?: string;
  clientName?: string;
  pedidoId?: number;
}

interface ChatContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  createConversation: (serviceId: string, providerId: string, clientId: string, meta?: CreateConversationMeta) => string;
  updateConversationPedido: (conversationId: string, pedidoId: number) => void;
  sendMessage: (conversationId: string, senderId: string, content: string) => void;
  markAsRead: (conversationId: string, userId: string) => void;
  getConversation: (conversationId: string) => Conversation | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    serviceId: '1',
    serviceName: 'Desenvolvimento de Landing Page em React',
    servicePrice: 1500,
    providerId: '1',
    providerName: 'DevPro',
    clientId: '2',
    clientName: 'TechClient',
    lastMessage: 'Ótimo! Quando podemos começar?',
    lastMessageTime: new Date('2026-03-30T10:30:00'),
    unreadCount: 1,
  },
];

const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: '2',
      senderName: 'TechClient',
      content: 'Olá! Gostaria de contratar o serviço de Landing Page.',
      timestamp: new Date('2026-03-30T10:00:00'),
      read: true,
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: '1',
      senderName: 'DevPro',
      content: 'Olá! Que ótimo! Poderia me dar mais detalhes sobre o projeto?',
      timestamp: new Date('2026-03-30T10:15:00'),
      read: true,
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: '2',
      senderName: 'TechClient',
      content: 'Preciso de uma landing page moderna para meu produto SaaS, com design responsivo e integração com formulário de contato.',
      timestamp: new Date('2026-03-30T10:20:00'),
      read: true,
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      senderId: '1',
      senderName: 'DevPro',
      content: 'Perfeito! Consigo entregar em 7 dias úteis. O valor será R$ 1.500,00. Está de acordo?',
      timestamp: new Date('2026-03-30T10:25:00'),
      read: true,
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: '2',
      senderName: 'TechClient',
      content: 'Ótimo! Quando podemos começar?',
      timestamp: new Date('2026-03-30T10:30:00'),
      read: false,
    },
  ],
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  const createConversation = (
    serviceId: string,
    providerId: string,
    clientId: string,
    meta?: CreateConversationMeta
  ): string => {
    const existing = conversations.find(
      c => c.serviceId === serviceId && c.providerId === providerId && c.clientId === clientId
    );

    if (existing) {
      // Update pedidoId if a new one is provided
      if (meta?.pedidoId && !existing.pedidoId) {
        setConversations(prev =>
          prev.map(c => c.id === existing.id ? { ...c, pedidoId: meta.pedidoId } : c)
        );
      }
      return existing.id;
    }

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      serviceId,
      serviceName: meta?.serviceName ?? 'Novo Serviço',
      servicePrice: meta?.servicePrice,
      pedidoId: meta?.pedidoId,
      providerId,
      providerName: meta?.providerName ?? 'Provedor',
      clientId,
      clientName: meta?.clientName ?? 'Cliente',
      unreadCount: 0,
    };

    setConversations(prev => [...prev, newConversation]);
    setMessages(prev => ({ ...prev, [newConversation.id]: [] }));

    return newConversation.id;
  };

  const updateConversationPedido = (conversationId: string, pedidoId: number) => {
    setConversations(prev =>
      prev.map(c => c.id === conversationId ? { ...c, pedidoId } : c)
    );
  };

  const sendMessage = (conversationId: string, senderId: string, content: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName: senderId === conversation.providerId ? conversation.providerName : conversation.clientName,
      content,
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: content,
              lastMessageTime: newMessage.timestamp,
              unreadCount: senderId !== c.clientId ? c.unreadCount + 1 : c.unreadCount,
            }
          : c
      )
    );
  };

  const markAsRead = (conversationId: string, userId: string) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map(m =>
        m.senderId !== userId ? { ...m, read: true } : m
      ),
    }));

    setConversations(prev =>
      prev.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c)
    );
  };

  const getConversation = (conversationId: string) => {
    return conversations.find(c => c.id === conversationId);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        createConversation,
        updateConversationPedido,
        sendMessage,
        markAsRead,
        getConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
