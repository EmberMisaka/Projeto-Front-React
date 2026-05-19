import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Logo } from '../components/Logo';
import {
  LogOut,
  DollarSign,
  ShoppingBag,
  Star,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
} from 'lucide-react';
import { mockOrders, mockServices, categoryNames } from '../data/mockData';
import { toast } from 'sonner';

export default function Provider() {
  const { user, logout } = useAuth();
  const { conversations } = useChat();
  const navigate = useNavigate();
  const [showAddService, setShowAddService] = useState(false);

  // Count unread messages
  const unreadCount = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  // Mock data filtrado para o provedor atual
  const providerOrders = mockOrders;
  const providerServices = mockServices.filter(s => s.providerId === user?.id);

  // Cálculos de estatísticas
  const totalEarnings = providerOrders
    .filter(o => o.status === 'completed')
    .reduce((acc, order) => acc + order.price, 0);
  
  const activeOrders = providerOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;
  
  const avgRating = providerOrders
    .filter(o => o.rating)
    .reduce((acc, order, _, arr) => acc + (order.rating || 0) / arr.length, 0);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'outline' | 'destructive', label: string }> = {
      pending: { variant: 'secondary', label: 'Pendente' },
      'in-progress': { variant: 'default', label: 'Em Andamento' },
      completed: { variant: 'outline', label: 'Concluído' },
      cancelled: { variant: 'destructive', label: 'Cancelado' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <Logo />
            <span className="text-xl font-semibold">TechMarket</span>
          </button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/chat')}>
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <button onClick={() => navigate('/provider')} className="cursor-pointer hover:opacity-80 transition-opacity">
              <Avatar>
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
            <div className="hidden md:block">
              <p className="font-medium">{user?.username}</p>
              <p className="text-sm text-muted-foreground">Provedor</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalEarnings.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +20.1% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Ativos</CardTitle>
              <ShoppingBag className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {providerOrders.filter(o => o.status === 'pending').length} aguardando aprovação
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRating.toFixed(1)} / 5.0</div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(avgRating) ? 'fill-accent text-accent' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Histórico de Pedidos</TabsTrigger>
            <TabsTrigger value="services">Meus Serviços</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
                <CardDescription>Acompanhe todos os seus pedidos e avaliações</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Avaliação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providerOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.clientName}</TableCell>
                        <TableCell>{order.serviceName}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>R$ {order.price.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>
                          {order.rating ? (
                            <div className="flex items-center gap-1">
                              {[...Array(order.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Sem avaliação</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Serviços Oferecidos</CardTitle>
                      <CardDescription>Gerencie seus serviços e pacotes</CardDescription>
                    </div>
                    <Button onClick={() => setShowAddService(!showAddService)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Serviço
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showAddService && (
                    <Card className="mb-6 bg-muted/50">
                      <CardHeader>
                        <CardTitle>Novo Serviço</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Título</Label>
                          <Input
                            id="title"
                            placeholder="Ex: Desenvolvimento de Landing Page"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="frontend">Frontend</SelectItem>
                              <SelectItem value="uxui">UX/UI</SelectItem>
                              <SelectItem value="backend">Backend</SelectItem>
                              <SelectItem value="ia">IA</SelectItem>
                              <SelectItem value="dados">Dados</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea
                            id="description"
                            placeholder="Descreva seu serviço..."
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Preço (R$)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="1500"
                            className="bg-background"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => {
                            toast.success('Serviço adicionado com sucesso!');
                            setShowAddService(false);
                          }}>
                            Salvar
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddService(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providerServices.map((service) => (
                      <Card key={service.id} className="bg-card border-border/50">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{service.title}</CardTitle>
                              <Badge variant="secondary" className="mt-2">
                                {categoryNames[service.category]}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">
                              R$ {service.price.toLocaleString('pt-BR')}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span className="font-medium">{service.rating}</span>
                              <span className="text-muted-foreground">({service.reviews})</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}