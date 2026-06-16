import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  ArrowLeft,
  Send,
  CreditCard,
  QrCode,
  Check,
  Copy,
  Package,
  Shield,
  Clock,
  MessageSquare,
  DollarSign,
} from 'lucide-react';
import { mockServices } from '../data/mockData';
import { pagarPedido } from '../services/api';
import { toast } from 'sonner';

type PaymentMethod = 'pix' | 'credit' | 'debit';

export default function ChatCheckout() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { conversations, messages, sendMessage, markAsRead, getConversation } = useChat();

  const [selectedConversation, setSelectedConversation] = useState(conversationId);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Payment states
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Card form data
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [installments, setInstallments] = useState('1');

  const conversation = getConversation(selectedConversation || '');
  const conversationMessages = messages[selectedConversation || ''] || [];
  const mockService = mockServices.find(s => s.id === conversation?.serviceId);
  // Use conversation metadata for real services, fall back to mock
  const service = mockService ?? (conversation ? {
    id: conversation.serviceId,
    title: conversation.serviceName,
    price: conversation.servicePrice ?? 0,
    providerName: conversation.providerName,
  } : null);

  // Mock PIX QR Code
  const pixCode = 'BR.GOV.BCB.PIX.000000000000000000000000000000000000000000000';

  useEffect(() => {
    if (selectedConversation && user) {
      markAsRead(selectedConversation, user.id);
    }
  }, [selectedConversation, user, markAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation || !user) return;

    sendMessage(selectedConversation, user.id, messageText);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (convId: string) => {
    setSelectedConversation(convId);
    setShowPayment(false);
    navigate(`/chat/${convId}`);
  };

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast.success('Código PIX copiado!');
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCardExpiry(formatExpiry(value));
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardCVV(value);
    }
  };

  const handlePayment = async () => {
    const pedidoId = conversation?.pedidoId;

    if (!pedidoId) {
      toast.error('Nenhum pedido associado a esta conversa. Contrate o serviço novamente.');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await pagarPedido(pedidoId);
      toast.success('Redirecionando para o pagamento...');
      window.open(res.link_do_pagamento, '_blank', 'noopener,noreferrer');
      setPaymentSuccess(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.erro || 'Erro ao processar pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  const otherUser = conversation
    ? user?.id === conversation.providerId
      ? { name: conversation.clientName, avatar: conversation.clientAvatar }
      : { name: conversation.providerName, avatar: conversation.providerAvatar }
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(user?.type === 'client' ? '/client' : '/provider')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <button onClick={() => navigate('/')} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              <span className="text-xl font-semibold">TechMarket</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <Card className="col-span-12 lg:col-span-3 bg-card border-border/50">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-lg">Conversas</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-280px)]">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhuma conversa ainda</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {conversations.map((conv) => {
                      const isProvider = user?.id === conv.providerId;
                      const displayName = isProvider ? conv.clientName : conv.providerName;
                      const displayAvatar = isProvider ? conv.clientAvatar : conv.providerAvatar;

                      return (
                        <button
                          key={conv.id}
                          onClick={() => handleSelectConversation(conv.id)}
                          className={`w-full p-4 hover:bg-muted/50 transition-colors text-left ${
                            selectedConversation === conv.id ? 'bg-muted' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={displayAvatar} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                                {displayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium truncate">{displayName}</p>
                                {conv.lastMessageTime && (
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(conv.lastMessageTime).toLocaleTimeString('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate mb-1">
                                {conv.serviceName}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground truncate flex-1">
                                  {conv.lastMessage || 'Nova conversa'}
                                </p>
                                {conv.unreadCount > 0 && (
                                  <Badge className="bg-primary text-primary-foreground ml-2">
                                    {conv.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat or Payment Area */}
          <div className="col-span-12 lg:col-span-6 flex flex-col">
            <Card className="flex-1 bg-card border-border/50 flex flex-col">
              {conversation && otherUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={otherUser.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                            {otherUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{otherUser.name}</p>
                          <p className="text-sm text-muted-foreground">{conversation.serviceName}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {user?.type === 'client' && !showPayment && (
                          <Button onClick={() => setShowPayment(true)} className="gap-2">
                            <DollarSign className="w-4 h-4" />
                            Pagar
                          </Button>
                        )}
                        {showPayment && (
                          <Button onClick={() => setShowPayment(false)} variant="outline" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Chat
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Info Banner */}
                  {service && (
                    <div className="p-4 bg-muted/50 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{service.title}</p>
                          <p className="text-sm text-muted-foreground">
                            R$ {service.price.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat or Payment Content */}
                  {!showPayment ? (
                    <>
                      {/* Messages */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {conversationMessages.map((message) => {
                            const isCurrentUser = message.senderId === user?.id;
                            return (
                              <div
                                key={message.id}
                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                    isCurrentUser
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted'
                                  }`}
                                >
                                  <p className="break-words">{message.content}</p>
                                  <p
                                    className={`text-xs mt-1 ${
                                      isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                    }`}
                                  >
                                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      {/* Message Input */}
                      <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Input
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 bg-muted"
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                            size="icon"
                            className="shrink-0"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <ScrollArea className="flex-1">
                      {paymentSuccess ? (
                        <div className="flex items-center justify-center p-12">
                          <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                              <Check className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold">Pagamento Confirmado!</h3>
                            <p className="text-muted-foreground">
                              Seu pagamento foi processado com sucesso.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 space-y-6">
                          {/* Payment Method Selection */}
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Método de Pagamento</h3>
                            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                  <RadioGroupItem value="pix" id="pix" />
                                  <Label htmlFor="pix" className="flex items-center gap-3 cursor-pointer flex-1">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                      <QrCode className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">PIX</p>
                                      <p className="text-sm text-muted-foreground">Instantâneo</p>
                                    </div>
                                  </Label>
                                </div>

                                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                  <RadioGroupItem value="credit" id="credit" />
                                  <Label htmlFor="credit" className="flex items-center gap-3 cursor-pointer flex-1">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                      <CreditCard className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">Crédito</p>
                                      <p className="text-sm text-muted-foreground">Até 12x</p>
                                    </div>
                                  </Label>
                                </div>

                                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                  <RadioGroupItem value="debit" id="debit" />
                                  <Label htmlFor="debit" className="flex items-center gap-3 cursor-pointer flex-1">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                      <CreditCard className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">Débito</p>
                                      <p className="text-sm text-muted-foreground">À vista</p>
                                    </div>
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Payment Details */}
                          <div>
                            {paymentMethod === 'pix' && (
                              <div className="space-y-4">
                                <div className="text-center space-y-4">
                                  <div className="inline-block p-4 bg-white rounded-xl">
                                    <div className="w-40 h-40 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center rounded-lg">
                                      <QrCode className="w-28 h-28 text-white" />
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">Escaneie o QR Code</p>
                                </div>

                                <div className="space-y-3">
                                  <div className="p-3 bg-muted rounded-lg break-all text-xs font-mono">
                                    {pixCode}
                                  </div>
                                  <Button onClick={handleCopyPixCode} variant="outline" className="w-full">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copiar Código PIX
                                  </Button>
                                </div>

                                <Button onClick={handlePayment} disabled={isProcessing} className="w-full" size="lg">
                                  {isProcessing ? 'Processando...' : 'Confirmar Pagamento'}
                                </Button>
                              </div>
                            )}

                            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                                  <Input
                                    id="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="bg-input-background"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="cardName">Nome no Cartão</Label>
                                  <Input
                                    id="cardName"
                                    placeholder="NOME COMPLETO"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                    className="bg-input-background"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="cardExpiry">Validade</Label>
                                    <Input
                                      id="cardExpiry"
                                      placeholder="MM/AA"
                                      value={cardExpiry}
                                      onChange={handleExpiryChange}
                                      className="bg-input-background"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="cardCVV">CVV</Label>
                                    <Input
                                      id="cardCVV"
                                      placeholder="000"
                                      value={cardCVV}
                                      onChange={handleCVVChange}
                                      className="bg-input-background"
                                    />
                                  </div>
                                </div>

                                {paymentMethod === 'credit' && service && (
                                  <div className="space-y-2">
                                    <Label htmlFor="installments">Parcelas</Label>
                                    <select
                                      id="installments"
                                      value={installments}
                                      onChange={(e) => setInstallments(e.target.value)}
                                      className="w-full h-10 px-3 rounded-md border border-input bg-input-background"
                                    >
                                      <option value="1">1x de R$ {service.price.toLocaleString('pt-BR')} sem juros</option>
                                      <option value="2">2x de R$ {(service.price / 2).toLocaleString('pt-BR')} sem juros</option>
                                      <option value="3">3x de R$ {(service.price / 3).toLocaleString('pt-BR')} sem juros</option>
                                      <option value="6">6x de R$ {(service.price / 6).toLocaleString('pt-BR')} sem juros</option>
                                      <option value="12">12x de R$ {(service.price / 12).toLocaleString('pt-BR')} sem juros</option>
                                    </select>
                                  </div>
                                )}

                                <Button
                                  onClick={handlePayment}
                                  disabled={isProcessing || !cardNumber || !cardName || !cardExpiry || !cardCVV}
                                  className="w-full"
                                  size="lg"
                                >
                                  {isProcessing ? 'Processando...' : service ? `Pagar R$ ${service.price.toLocaleString('pt-BR')}` : 'Pagar'}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Selecione uma conversa</h3>
                      <p className="text-muted-foreground">
                        Escolha uma conversa à esquerda para começar
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          {service && (
            <Card className="col-span-12 lg:col-span-3 bg-card border-border/50 h-fit sticky top-24">
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{service.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">Por {service.providerName}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {service.price.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold">R$ {service.price.toLocaleString('pt-BR')}</span>
                </div>

                <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Garantia de 7 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
