import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Logo } from '../components/Logo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Shield,
  Users,
  AlertTriangle,
  Ban,
  UserX,
  Search,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  LogOut,
  Eye,
} from 'lucide-react';
import { mockUserProfiles, mockModerations, mockOrders, mockServices } from '../data/mockData';
import { toast } from 'sonner';

type ModerationType = 'warning' | 'restriction' | 'ban';

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModerationDialog, setShowModerationDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [moderationType, setModerationType] = useState<ModerationType>('warning');
  const [moderationReason, setModerationReason] = useState('');
  const [moderationDays, setModerationDays] = useState('1');
  const [moderationHours, setModerationHours] = useState('0');

  // Check if user is admin (in real app, this would be from backend)
  if (user?.type !== 'provider' && user?.type !== 'client') {
    // For demo purposes, allow access
  }

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  const handleModeration = () => {
    if (!moderationReason.trim()) {
      toast.error('O motivo é obrigatório');
      return;
    }

    const totalHours = parseInt(moderationDays) * 24 + parseInt(moderationHours);
    if (totalHours <= 0) {
      toast.error('A duração deve ser maior que zero');
      return;
    }

    // Mock moderation action
    toast.success(`${moderationType === 'warning' ? 'Advertência' : moderationType === 'restriction' ? 'Restrição' : 'Banimento'} aplicado com sucesso!`);
    setShowModerationDialog(false);
    setModerationReason('');
    setModerationDays('1');
    setModerationHours('0');
  };

  const openModerationDialog = (userId: string, type: ModerationType) => {
    setSelectedUser(userId);
    setModerationType(type);
    setShowModerationDialog(true);
  };

  const filteredUsers = mockUserProfiles.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = mockUserProfiles.length;
  const totalRevenue = mockOrders
    .filter((o) => o.status === 'completed')
    .reduce((acc, order) => acc + order.price, 0);
  const totalOrders = mockOrders.length;
  const activeModerations = mockModerations.filter((m) => m.status === 'active').length;

  const getStatusBadge = (status?: string) => {
    if (!status || status === 'active') {
      return <Badge className="bg-green-600">Ativo</Badge>;
    }
    if (status === 'restricted') {
      return <Badge className="bg-orange-600">Restrito</Badge>;
    }
    if (status === 'banned') {
      return <Badge variant="destructive">Banido</Badge>;
    }
    return null;
  };

  const getModerationBadge = (type: string) => {
    if (type === 'warning') {
      return <Badge className="bg-yellow-600">Advertência</Badge>;
    }
    if (type === 'restriction') {
      return <Badge className="bg-orange-600">Restrição</Badge>;
    }
    if (type === 'ban') {
      return <Badge variant="destructive">Banimento</Badge>;
    }
    return null;
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
            <Badge className="bg-gradient-to-r from-primary to-secondary">
              <Shield className="w-3 h-3 mr-1" />
              Administrador
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Provedores e Contratantes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground mt-1">
                De transações completadas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <ShoppingBag className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Todos os status
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Moderações Ativas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeModerations}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Restrições e banimentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
            <TabsTrigger value="moderations">Moderações</TabsTrigger>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gerenciar Usuários</CardTitle>
                    <CardDescription>
                      Visualize informações e aplique moderações aos usuários
                    </CardDescription>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-input-background"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((profile) => (
                    <Card key={profile.id} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={profile.photo} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                              {profile.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{profile.username}</h3>
                              {getStatusBadge(profile.status)}
                              <Badge variant="outline">
                                {profile.type === 'provider' ? 'Provedor' : 'Contratante'}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                              <div>Email: {profile.email}</div>
                              <div>Avaliação: {profile.rating} ⭐ ({profile.reviewsCount} reviews)</div>
                              <div>Membro desde: {new Date(profile.joinDate).toLocaleDateString('pt-BR')}</div>
                              <div>Pedidos: {profile.totalOrders || 0}</div>
                              {profile.warnings && profile.warnings > 0 && (
                                <div className="text-orange-500">
                                  Advertências: {profile.warnings}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/profile/${profile.id}`)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Perfil
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-yellow-600 hover:text-yellow-600"
                                onClick={() => openModerationDialog(profile.id, 'warning')}
                              >
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Advertir
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-orange-600 hover:text-orange-600"
                                onClick={() => openModerationDialog(profile.id, 'restriction')}
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Restringir
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                                onClick={() => openModerationDialog(profile.id, 'ban')}
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Banir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderations Tab */}
          <TabsContent value="moderations">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Moderações</CardTitle>
                <CardDescription>Acompanhe todas as ações de moderação aplicadas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Data Início</TableHead>
                      <TableHead>Data Fim</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockModerations.map((mod) => (
                      <TableRow key={mod.id}>
                        <TableCell className="font-medium">{mod.username}</TableCell>
                        <TableCell>{getModerationBadge(mod.type)}</TableCell>
                        <TableCell className="max-w-xs truncate">{mod.reason}</TableCell>
                        <TableCell>{mod.duration}h</TableCell>
                        <TableCell>
                          {new Date(mod.startDate).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          {new Date(mod.endDate).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={mod.status === 'active' ? 'default' : 'secondary'}>
                            {mod.status === 'active' ? 'Ativa' : 'Expirada'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Mais Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockServices.slice(0, 5).map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{service.title}</p>
                          <p className="text-sm text-muted-foreground">{service.providerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">⭐ {service.rating}</p>
                          <p className="text-xs text-muted-foreground">{service.reviews} reviews</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Provedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUserProfiles
                      .filter((u) => u.type === 'provider')
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((provider) => (
                        <div key={provider.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Avatar>
                            <AvatarImage src={provider.photo} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                              {provider.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{provider.username}</p>
                            <p className="text-sm text-muted-foreground">
                              {provider.totalOrders || 0} pedidos
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">⭐ {provider.rating}</p>
                            <p className="text-xs text-muted-foreground">
                              {provider.reviewsCount} reviews
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Moderation Dialog */}
      <Dialog open={showModerationDialog} onOpenChange={setShowModerationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {moderationType === 'warning' && 'Aplicar Advertência'}
              {moderationType === 'restriction' && 'Aplicar Restrição'}
              {moderationType === 'ban' && 'Aplicar Banimento'}
            </DialogTitle>
            <DialogDescription>
              Esta ação será registrada e o usuário será notificado. Preencha todos os campos
              obrigatórios.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo *</Label>
              <Textarea
                id="reason"
                placeholder="Descreva o motivo da moderação..."
                value={moderationReason}
                onChange={(e) => setModerationReason(e.target.value)}
                className="bg-input-background min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="days">Dias *</Label>
                <Input
                  id="days"
                  type="number"
                  min="0"
                  value={moderationDays}
                  onChange={(e) => setModerationDays(e.target.value)}
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Horas *</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="23"
                  value={moderationHours}
                  onChange={(e) => setModerationHours(e.target.value)}
                  className="bg-input-background"
                />
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-1">Duração Total:</p>
              <p className="text-muted-foreground">
                {parseInt(moderationDays) * 24 + parseInt(moderationHours)} horas (
                {moderationDays} dia{parseInt(moderationDays) !== 1 ? 's' : ''} e {moderationHours}{' '}
                hora{parseInt(moderationHours) !== 1 ? 's' : ''})
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModerationDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleModeration}
              className={
                moderationType === 'warning'
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : moderationType === 'restriction'
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-destructive hover:bg-destructive/90'
              }
            >
              Confirmar {moderationType === 'warning' && 'Advertência'}
              {moderationType === 'restriction' && 'Restrição'}
              {moderationType === 'ban' && 'Banimento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
