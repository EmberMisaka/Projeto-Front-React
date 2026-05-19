import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth, UserType } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState('');
  const [userType, setUserType] = useState<UserType>('client');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(email, password, username, userType, photo);
      if (success) {
        toast.success('Conta criada com sucesso!');
        navigate(userType === 'provider' ? '/provider' : '/client');
      } else {
        toast.error('Erro ao criar conta');
      }
    } catch (error) {
      toast.error('Erro ao criar conta');
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
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>Escolha o tipo de conta que deseja criar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client">Contratante</TabsTrigger>
              <TabsTrigger value="provider">Provedor</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center gap-4 mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={photo} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      <Upload className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="photo-client" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <span>Escolher Foto</span>
                      </Button>
                    </Label>
                    <Input
                      id="photo-client"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="seu_usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Criando conta...' : 'Criar Conta como Contratante'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="provider">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center gap-4 mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={photo} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      <Upload className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="photo-provider" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <span>Escolher Foto</span>
                      </Button>
                    </Label>
                    <Input
                      id="photo-provider"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username-provider">Nome de Usuário</Label>
                  <Input
                    id="username-provider"
                    type="text"
                    placeholder="seu_usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="confirm-password-provider">Confirmar Senha</Label>
                  <Input
                    id="confirm-password-provider"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Criando conta...' : 'Criar Conta como Provedor'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link to="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}