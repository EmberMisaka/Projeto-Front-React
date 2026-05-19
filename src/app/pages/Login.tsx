import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth, UserType } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('client');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password, userType);
      if (success) {
        toast.success('Login realizado com sucesso!');
        navigate(userType === 'provider' ? '/provider' : '/client');
      } else {
        toast.error('Email ou senha inválidos');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-4 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
        <span className="text-xl font-semibold">TechMarket</span>
      </button>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Escolha como deseja entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client">Contratante</TabsTrigger>
              <TabsTrigger value="provider">Provedor</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar como Contratante'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="provider">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Email</Label>
                  <Input
                    id="email-provider"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-provider">Senha</Label>
                  <Input
                    id="password-provider"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar como Provedor'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link to="/register" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Contas de teste:</p>
            <p>Contratante: client@example.com</p>
            <p>Provedor: provider@example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}