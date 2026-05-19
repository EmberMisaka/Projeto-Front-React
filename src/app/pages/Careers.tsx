import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Logo } from '../components/Logo';
import {
  Briefcase,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Award,
  Users,
  Target,
} from 'lucide-react';
import { mockJobs } from '../data/mockData';

export default function Careers() {
  const navigate = useNavigate();

  const getJobTypeBadge = (type: string) => {
    const types: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
      'full-time': { label: 'Tempo Integral', variant: 'default' },
      'part-time': { label: 'Meio Período', variant: 'secondary' },
      contract: { label: 'Contrato', variant: 'outline' },
    };
    return types[type] || types['full-time'];
  };

  const getStatusBadge = (status: string) => {
    if (status === 'open') {
      return <Badge className="bg-green-600">Aberta</Badge>;
    }
    return <Badge variant="secondary">Em Breve</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <Logo size="md" />
            <span className="text-xl font-semibold">TechMarket</span>
          </button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>Cadastrar</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border/50 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <Badge className="mb-4 text-base px-4 py-2">
                <Briefcase className="w-4 h-4 mr-2" />
                Carreiras
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Construa sua carreira no{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                futuro da tecnologia
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Junte-se à nossa equipe e ajude a transformar o mercado de freelancers em tecnologia.
              Valorizamos provedores com bons resultados na plataforma!
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Por que trabalhar conosco?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos benefícios exclusivos e oportunidades de crescimento para todos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Preferência para Top Provedores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Provedores com alta avaliação e bons resultados na plataforma têm prioridade nas
                contratações
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Crescimento Contínuo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Oportunidades de desenvolvimento profissional e crescimento de carreira
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Remuneração Competitiva</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Salários compatíveis com o mercado e benefícios atrativos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Ambiente Colaborativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trabalhe com profissionais talentosos em um ambiente inovador e inclusivo
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Provider Priority Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-primary/30">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">
                  Preferência para Provedores da Plataforma
                </CardTitle>
                <CardDescription className="text-base">
                  Se você já é um provedor ativo na TechMarket, você tem vantagens especiais no
                  processo seletivo!
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold">Alta Avaliação</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Provedores com rating 4.5+ têm prioridade máxima
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold">Projetos Concluídos</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Quanto mais projetos finalizados, maior a prioridade
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold">Comportamento Exemplar</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sem advertências ou restrições na conta
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Jobs Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Vagas Disponíveis</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira nossas oportunidades abertas e candidate-se agora
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {mockJobs.map((job) => (
            <Card
              key={job.id}
              className="bg-card border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {new Date(job.postedDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getJobTypeBadge(job.type).variant}>
                    {getJobTypeBadge(job.type).label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Descrição</h4>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Requisitos</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full md:w-auto"
                    disabled={job.status === 'coming-soon'}
                    onClick={() => {
                      // Mock application
                      if (job.status === 'open') {
                        alert('Candidatura enviada com sucesso!');
                      }
                    }}
                  >
                    {job.status === 'open' ? 'Candidatar-se' : 'Em Breve'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white border-0">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Não encontrou a vaga ideal?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Envie seu currículo para nosso banco de talentos! Entraremos em contato quando surgir
              uma oportunidade que combine com seu perfil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/register')}
              >
                Criar Conta
              </Button>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => alert('Funcionalidade em desenvolvimento')}
              >
                Enviar Currículo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 TechMarket. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
