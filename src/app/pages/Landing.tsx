import { Link } from 'react-router';
import { Code, Palette, Database, Brain, Server } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Logo } from '../components/Logo';

const categories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Code,
    description: 'React, Vue, Angular e mais',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'uxui',
    name: 'UX/UI',
    icon: Palette,
    description: 'Design de interfaces e experiências',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    description: 'APIs, servidores e microsserviços',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'ia',
    name: 'IA',
    icon: Brain,
    description: 'Machine Learning e Deep Learning',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'dados',
    name: 'Dados',
    icon: Database,
    description: 'Análise, ETL e Data Science',
    color: 'from-blue-600 to-cyan-600',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold">TechMarket</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Conecte-se com os melhores profissionais de tecnologia
          </h1>
          <p className="text-xl text-muted-foreground">
            Marketplace especializado em serviços de tecnologia. Encontre freelancers qualificados ou ofereça seus serviços.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Começar Agora
              </Button>
            </Link>
            <Link to="/client">
              <Button size="lg" variant="outline">
                Explorar Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Categorias Especializadas</h2>
          <p className="text-muted-foreground">
            Encontre profissionais especializados em cada área da tecnologia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="relative overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20 bg-card border-border/50"
              >
                <Link to={`/client?category=${category.id}`} className="block p-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  <div className="relative space-y-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              10k+
            </div>
            <p className="text-muted-foreground">Profissionais Cadastrados</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              50k+
            </div>
            <p className="text-muted-foreground">Projetos Concluídos</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              4.9/5
            </div>
            <p className="text-muted-foreground">Avaliação Média</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">&copy; 2026 TechMarket. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                Carreiras
              </Link>
              <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}