import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Star, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { mockServices, mockOrders, categoryNames } from '../data/mockData';
import { toast } from 'sonner';

const categoryColors = {
  frontend: 'from-blue-500 to-indigo-600',
  uxui: 'from-purple-500 to-pink-600',
  backend: 'from-indigo-500 to-purple-600',
  ia: 'from-violet-500 to-purple-600',
  dados: 'from-blue-600 to-cyan-600',
};

// Mock provider data
const mockProviders: Record<string, any> = {
  '1': {
    id: '1',
    name: 'DevPro',
    bio: 'Desenvolvedor Full Stack especializado em React e Node.js com mais de 5 anos de experiência. Apaixonado por criar interfaces modernas e performáticas.',
    avatar: '',
    location: 'São Paulo, SP',
    memberSince: '2021-01-15',
    completedProjects: 127,
  },
  '3': {
    id: '3',
    name: 'DesignMaster',
    bio: 'Designer UX/UI com foco em criar experiências excepcionais. Especialista em design systems e prototipagem.',
    avatar: '',
    location: 'Rio de Janeiro, RJ',
    memberSince: '2020-06-10',
    completedProjects: 203,
  },
  '4': {
    id: '4',
    name: 'BackendPro',
    bio: 'Arquiteto de software com expertise em microsserviços e APIs escaláveis. Focado em performance e segurança.',
    avatar: '',
    location: 'Belo Horizonte, MG',
    memberSince: '2019-03-22',
    completedProjects: 156,
  },
  '5': {
    id: '5',
    name: 'AIExpert',
    bio: 'Cientista de dados especializado em Machine Learning e Deep Learning. PhD em Inteligência Artificial.',
    avatar: '',
    location: 'Campinas, SP',
    memberSince: '2020-09-05',
    completedProjects: 89,
  },
  '6': {
    id: '6',
    name: 'DataScientist',
    bio: 'Analista de dados com foco em BI e visualização de dados. Transformo dados em insights acionáveis.',
    avatar: '',
    location: 'Porto Alegre, RS',
    memberSince: '2021-04-18',
    completedProjects: 112,
  },
};

export default function ProviderProfile() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createConversation } = useChat();

  const provider = mockProviders[providerId || ''];
  const providerServices = mockServices.filter(s => s.providerId === providerId);
  const providerOrders = mockOrders.filter(o => 
    providerServices.some(s => s.id === o.serviceId)
  );

  // Calcular estatísticas
  const completedOrders = providerOrders.filter(o => o.status === 'completed');
  const avgRating = completedOrders
    .filter(o => o.rating)
    .reduce((acc, order, _, arr) => acc + (order.rating || 0) / arr.length, 0);

  // Agrupar avaliações
  const reviewsWithRating = providerOrders.filter(o => o.rating && o.status === 'completed');

  const handleHireService = (service: any) => {
    if (!user) {
      toast.error('Você precisa estar logado para contratar um serviço');
      navigate('/login');
      return;
    }
    
    // Create or get existing conversation
    const convId = createConversation(service.id, service.providerId, user.id);
    navigate(`/chat/${convId}`);
  };

  if (!provider) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Provedor não encontrado</p>
          <Button onClick={() => navigate('/client')}>Voltar</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <button onClick={() => navigate('/')} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              <span className="text-xl font-semibold">TechMarket</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Provider Header */}
        <Card className="mb-8 bg-gradient-to-br from-card to-muted/30 border-border/50">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={provider.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-4xl">
                  {provider.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                    <p className="text-muted-foreground mb-4">{provider.bio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Membro desde {new Date(provider.memberSince).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{provider.completedProjects} projetos concluídos</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(avgRating) ? 'fill-accent text-accent' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg">{avgRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({reviewsWithRating.length} avaliações)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Serviços Oferecidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providerServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] bg-card border-border/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{categoryNames[service.category]}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{service.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">A partir de</p>
                      <p className="text-2xl font-bold">R$ {service.price.toLocaleString('pt-BR')}</p>
                    </div>
                    <Button
                      onClick={() => handleHireService(service)}
                    >
                      Contratar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Avaliações Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsWithRating.slice(0, 6).map((review) => (
              <Card key={review.id} className="bg-card border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{review.clientName}</CardTitle>
                      <CardDescription>{review.serviceName}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Projeto concluído em {new Date(review.date).toLocaleDateString('pt-BR')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}