import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Logo } from '../components/Logo';
import {
  LogOut,
  Search,
  TrendingUp,
  Code,
  Palette,
  Server,
  Brain,
  Database,
  Star,
  User,
  MessageSquare,
} from 'lucide-react';
import { mockServices, categoryNames, Service } from '../data/mockData';
import { criarPedido } from '../services/api';
import { toast } from 'sonner';

const categoryIcons = {
  frontend: Code,
  uxui: Palette,
  backend: Server,
  ia: Brain,
  dados: Database,
};

const categoryColors = {
  frontend: 'from-blue-500 to-indigo-600',
  uxui: 'from-purple-500 to-pink-600',
  backend: 'from-indigo-500 to-purple-600',
  ia: 'from-violet-500 to-purple-600',
  dados: 'from-blue-600 to-cyan-600',
};

export default function Client() {
  const { user, logout } = useAuth();
  const { createConversation, conversations } = useChat();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );

  // Count unread messages
  const unreadCount = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  // Filtrar serviços
  const filteredServices = useMemo(() => {
    let filtered = mockServices;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        s =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.providerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Serviços em alta (ordenados por rating e reviews)
  const trendingServices = useMemo(() => {
    return [...mockServices]
      .sort((a, b) => {
        const scoreA = a.rating * a.reviews;
        const scoreB = b.rating * b.reviews;
        return scoreB - scoreA;
      })
      .slice(0, 4);
  }, []);

  const ServiceCard = ({ service }: { service: Service }) => {
    const Icon = categoryIcons[service.category];
    
    const handleHireService = async () => {
      if (!user) {
        toast.error('Você precisa estar logado para contratar um serviço');
        navigate('/login');
        return;
      }

      let pedidoId: number | undefined;

      try {
        const serviceIdNum = parseInt(service.id);
        if (!isNaN(serviceIdNum)) {
          const res = await criarPedido(serviceIdNum);
          pedidoId = res.pedido.id;
        }
      } catch {
        // Service may not exist in DB yet; proceed with chat only
      }

      const convId = createConversation(service.id, service.providerId, user.id, {
        serviceName: service.title,
        servicePrice: service.price,
        providerName: service.providerName,
        clientName: user.username,
        pedidoId,
      });

      navigate(`/chat/${convId}`);
    };
    
    return (
      <Card className="group hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] bg-card border-border/50">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[service.category]} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary">{categoryNames[service.category]}</Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <button
            onClick={() => navigate(`/provider/${service.providerId}`)}
            className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
          >
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage src={service.providerAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-xs">
                {service.providerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {service.providerName}
            </span>
          </button>
          
          <div className="flex items-center gap-2 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-medium">{service.rating}</span>
            </div>
            <span className="text-muted-foreground">({service.reviews} avaliações)</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">A partir de</p>
              <p className="text-2xl font-bold">R$ {service.price.toLocaleString('pt-BR')}</p>
            </div>
            <Button onClick={handleHireService}>
              Contratar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
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
            <button onClick={() => navigate('/client')} className="cursor-pointer hover:opacity-80 transition-opacity">
              <Avatar>
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
            <div className="hidden md:block">
              <p className="font-medium">{user?.username}</p>
              <p className="text-sm text-muted-foreground">Contratante</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-8 bg-gradient-to-br from-card to-muted/30 border-border/50">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar serviços, provedores ou categorias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Trending Services */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Serviços em Alta</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl hover:shadow-secondary/20 transition-all hover:scale-[1.02] bg-gradient-to-br from-card to-muted/30 border-border/50"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Em Alta
                    </Badge>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <button
                    onClick={() => navigate(`/provider/${service.providerId}`)}
                    className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
                  >
                    <Avatar className="w-6 h-6 cursor-pointer">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-xs">
                        {service.providerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {service.providerName}
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews})</span>
                  </div>
                  <div className="text-lg font-bold mt-3">
                    R$ {service.price.toLocaleString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Tabs */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Explorar por Categoria</h2>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="frontend">
                <Code className="w-4 h-4 mr-2" />
                Frontend
              </TabsTrigger>
              <TabsTrigger value="uxui">
                <Palette className="w-4 h-4 mr-2" />
                UX/UI
              </TabsTrigger>
              <TabsTrigger value="backend">
                <Server className="w-4 h-4 mr-2" />
                Backend
              </TabsTrigger>
              <TabsTrigger value="ia">
                <Brain className="w-4 h-4 mr-2" />
                IA
              </TabsTrigger>
              <TabsTrigger value="dados">
                <Database className="w-4 h-4 mr-2" />
                Dados
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory}>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-muted/50">
                  <p className="text-muted-foreground">
                    Nenhum serviço encontrado com os filtros atuais.
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}