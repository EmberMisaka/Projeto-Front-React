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

interface ChatContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  createConversation: (serviceId: string, providerId: string, clientId: string) => string;
  sendMessage: (conversationId: string, senderId: string, content: string) => void;
  markAsRead: (conversationId: string, userId: string) => void;
  getConversation: (conversationId: string) => Conversation | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    serviceId: '1',
    serviceName: 'Desenvolvimento de Landing Page em React',
    providerId: '1',
    providerName: 'DevPro',
    clientId: '2',
    clientName: 'TechClient',
    lastMessage: 'Ótimo! Quando podemos começar?',
    lastMessageTime: new Date('2026-03-30T10:30:00'),
    unreadCount: 1,
  },
];

// Mock messages
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
    clientId: string
  ): string => {
    // Check if conversation already exists
    const existing = conversations.find(
      c => c.serviceId === serviceId && c.providerId === providerId && c.clientId === clientId
    );
    
    if (existing) {
      return existing.id;
    }

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      serviceId,
      serviceName: 'Novo Serviço',
      providerId,
      providerName: 'Provedor',
      clientId,
      clientName: 'Cliente',
      unreadCount: 0,
    };

    setConversations([...conversations, newConversation]);
    setMessages({ ...messages, [newConversation.id]: [] });

    return newConversation.id;
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

    setMessages({
      ...messages,
      [conversationId]: [...(messages[conversationId] || []), newMessage],
    });

    // Update conversation
    setConversations(
      conversations.map(c =>
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
    const conversationMessages = messages[conversationId] || [];
    
    setMessages({
      ...messages,
      [conversationId]: conversationMessages.map(m =>
        m.senderId !== userId ? { ...m, read: true } : m
      ),
    });

    setConversations(
      conversations.map(c =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
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