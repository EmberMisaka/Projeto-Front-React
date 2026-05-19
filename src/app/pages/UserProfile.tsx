import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Logo } from '../components/Logo';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Globe,
  Star,
  Edit,
  Save,
  X,
  Briefcase,
  MessageSquare,
  Award,
} from 'lucide-react';
import { mockUserProfiles, mockUserReviews, mockServices } from '../data/mockData';
import { toast } from 'sonner';

export default function UserProfile() {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Find the profile
  const profile = mockUserProfiles.find((p) => p.id === userId) || mockUserProfiles[0];
  const isOwnProfile = user?.id === profile.id;

  // Edit state
  const [editedBio, setEditedBio] = useState(profile.bio || '');
  const [editedLocation, setEditedLocation] = useState(profile.location || '');
  const [editedWebsite, setEditedWebsite] = useState(profile.website || '');

  // Get user's reviews
  const userReviews = mockUserReviews.filter(
    (review) => profile.type === 'provider'
  );

  // Get user's services (if provider)
  const userServices = mockServices.filter((s) => s.providerId === profile.id);

  const handleSaveProfile = () => {
    // Mock save
    toast.success('Perfil atualizado com sucesso!');
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedBio(profile.bio || '');
    setEditedLocation(profile.location || '');
    setEditedWebsite(profile.website || '');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Logo size="md" />
              <span className="text-xl font-semibold">TechMarket</span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <div
          className="h-48 md:h-64 bg-gradient-to-br from-primary via-secondary to-accent"
          style={{
            backgroundImage: profile.banner ? `url(${profile.banner})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {isOwnProfile && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4"
            onClick={() => toast.info('Funcionalidade em desenvolvimento')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Banner
          </Button>
        )}
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-16 md:-mt-20 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background">
                <AvatarImage src={profile.photo} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-4xl">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0"
                  onClick={() => toast.info('Funcionalidade em desenvolvimento')}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={profile.type === 'provider' ? 'default' : 'secondary'}>
                      {profile.type === 'provider' ? 'Provedor' : 'Contratante'}
                    </Badge>
                    {profile.status === 'active' && (
                      <Badge className="bg-green-600">Ativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(profile.rating)
                              ? 'fill-accent text-accent'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{profile.rating}</span>
                    <span className="text-muted-foreground">
                      ({profile.reviewsCount} avaliações)
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isOwnProfile ? (
                    <>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar Perfil
                        </Button>
                      ) : (
                        <>
                          <Button onClick={handleSaveProfile}>
                            <Save className="w-4 h-4 mr-2" />
                            Salvar
                          </Button>
                          <Button variant="outline" onClick={handleCancelEdit}>
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <Button onClick={() => navigate('/chat')}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {(isEditing ? editedLocation : profile.location) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {isEditing ? editedLocation : profile.location}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Membro desde {new Date(profile.joinDate).toLocaleDateString('pt-BR')}
                </div>
                {(isEditing ? editedWebsite : profile.website) && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <a
                      href={isEditing ? editedWebsite : profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {isEditing ? editedWebsite : profile.website}
                    </a>
                  </div>
                )}
                {profile.totalOrders && profile.totalOrders > 0 && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {profile.totalOrders} pedidos completados
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.rating}</p>
                  <p className="text-sm text-muted-foreground">Avaliação Média</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.reviewsCount}</p>
                  <p className="text-sm text-muted-foreground">Total de Avaliações</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.totalOrders || 0}</p>
                  <p className="text-sm text-muted-foreground">Pedidos Completados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6 pb-12">
          <TabsList>
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            {profile.type === 'provider' && (
              <TabsTrigger value="services">Serviços</TabsTrigger>
            )}
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Conte um pouco sobre você..."
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="bg-input-background min-h-[120px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          placeholder="Cidade, Estado"
                          value={editedLocation}
                          onChange={(e) => setEditedLocation(e.target.value)}
                          className="bg-input-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://exemplo.com"
                          value={editedWebsite}
                          onChange={(e) => setEditedWebsite(e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {profile.bio ? (
                      <div>
                        <h3 className="font-semibold mb-2">Bio</h3>
                        <p className="text-muted-foreground">{profile.bio}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">Nenhuma bio adicionada ainda.</p>
                    )}

                    {profile.skills && profile.skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Habilidades</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações Recebidas</CardTitle>
                <CardDescription>
                  Avaliações de {profile.type === 'provider' ? 'clientes' : 'provedores'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userReviews.length > 0 ? (
                  <div className="space-y-4">
                    {userReviews.map((review) => (
                      <Card key={review.id} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.reviewerAvatar} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                                {review.reviewerName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-semibold">{review.reviewerName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'fill-accent text-accent'
                                          : 'text-muted'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-2">
                                Serviço: {review.serviceName}
                              </p>
                              <p className="text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhuma avaliação ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab (Only for providers) */}
          {profile.type === 'provider' && (
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Oferecidos</CardTitle>
                  <CardDescription>
                    Serviços disponíveis deste provedor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userServices.map((service) => (
                        <Card
                          key={service.id}
                          className="bg-card border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                          onClick={() => navigate(`/provider/${profile.id}#service-${service.id}`)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                              {service.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold">
                                R$ {service.price.toLocaleString('pt-BR')}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Star className="w-4 h-4 fill-accent text-accent" />
                                <span className="font-medium">{service.rating}</span>
                                <span className="text-muted-foreground">
                                  ({service.reviews})
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhum serviço cadastrado ainda
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
