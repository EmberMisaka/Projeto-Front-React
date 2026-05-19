# TechMarket - Design System Documentation

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Paleta de Cores](#paleta-de-cores)
3. [Tipografia](#tipografia)
4. [Espaçamentos](#espaçamentos)
5. [Componentes](#componentes)
6. [Layout e Grid](#layout-e-grid)
7. [Ícones](#ícones)
8. [Estados e Interações](#estados-e-interações)
9. [Páginas](#páginas)

---

## 🎨 Visão Geral

**TechMarket** é uma plataforma de marketplace para freelancers com foco em tecnologia. O design é minimalista, moderno e profissional, utilizando uma paleta de cores baseada em azuis, roxos e tonalidades de preto, criando uma experiência visual sofisticada.

### Princípios de Design
- **Minimalismo**: Interface limpa e focada no conteúdo
- **Hierarquia Visual**: Clara distinção entre elementos primários e secundários
- **Consistência**: Padrões repetidos em toda a aplicação
- **Acessibilidade**: Contraste adequado e textos legíveis
- **Responsividade**: Adaptável a diferentes tamanhos de tela

---

## 🎨 Paleta de Cores

### Cores Principais

#### Background
```
Background Principal: #0a0a0f (RGB: 10, 10, 15)
Foreground: #f5f5f7 (RGB: 245, 245, 247)
```

#### Brand Colors
```
Primary (Azul): #6366f1 (RGB: 99, 102, 241)
Primary Foreground: #ffffff (RGB: 255, 255, 255)

Secondary (Roxo): #8b5cf6 (RGB: 139, 92, 246)
Secondary Foreground: #ffffff (RGB: 255, 255, 255)

Accent (Roxo Escuro): #7c3aed (RGB: 124, 58, 237)
Accent Foreground: #ffffff (RGB: 255, 255, 255)
```

#### Surface Colors
```
Card: #131318 (RGB: 19, 19, 24)
Card Foreground: #f5f5f7 (RGB: 245, 245, 247)

Muted: #1f1f28 (RGB: 31, 31, 40)
Muted Foreground: #a1a1aa (RGB: 161, 161, 170)

Input Background: #1a1a22 (RGB: 26, 26, 34)
Switch Background: #2d2d3a (RGB: 45, 45, 58)
```

#### Feedback Colors
```
Destructive (Vermelho): #d4183d (RGB: 212, 24, 61)
Destructive Foreground: #ffffff (RGB: 255, 255, 255)

Success (Verde - usado em estados): #10b981 (RGB: 16, 185, 129)
Warning (Amarelo - usado em estados): #f59e0b (RGB: 245, 158, 11)
```

#### Borders & Outlines
```
Border: rgba(139, 92, 246, 0.2) (Secondary com 20% opacidade)
Ring: #6366f1 (Primary)
```

### Gradientes

#### Gradiente de Brand (Logo e Elementos Destacados)
```
from-primary to-secondary
De: #6366f1 para #8b5cf6
```

#### Gradientes para Cards de Categoria
```
Frontend: from-blue-500 to-cyan-600
UX/UI: from-purple-500 to-pink-600
Backend: from-green-500 to-emerald-600
IA: from-orange-500 to-red-600
Dados: from-indigo-500 to-blue-600
```

### Chart Colors (para Gráficos e Visualizações)
```
Chart 1: #6366f1
Chart 2: #8b5cf6
Chart 3: #7c3aed
Chart 4: #a78bfa
Chart 5: #c4b5fd
```

---

## ✍️ Tipografia

### Família de Fonte
```
Font Family: System Font Stack
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

### Escala de Tamanhos
```
Base: 16px (1rem)

h1: 1.5rem (24px) - Títulos principais
h2: 1.25rem (20px) - Subtítulos
h3: 1.125rem (18px) - Seções
h4: 1rem (16px) - Subseções

text-xs: 0.75rem (12px)
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
text-4xl: 2.25rem (36px)
```

### Pesos de Fonte
```
Normal: 400
Medium: 500
Semibold: 600
Bold: 700
```

### Line Height
```
Padrão: 1.5
Tight: 1.25
Relaxed: 1.75
```

### Casos de Uso
- **Títulos de Página (h1)**: font-semibold, text-2xl ou text-3xl
- **Títulos de Card (h2)**: font-semibold, text-lg ou text-xl
- **Subtítulos (h3)**: font-medium, text-base ou text-lg
- **Corpo de Texto**: font-normal, text-base
- **Texto Secundário**: text-sm, text-muted-foreground
- **Labels**: font-medium, text-sm
- **Botões**: font-medium, text-base

---

## 📏 Espaçamentos

### Escala de Espaçamento (Tailwind)
```
0: 0px
1: 4px (0.25rem)
2: 8px (0.5rem)
3: 12px (0.75rem)
4: 16px (1rem)
5: 20px (1.25rem)
6: 24px (1.5rem)
8: 32px (2rem)
10: 40px (2.5rem)
12: 48px (3rem)
16: 64px (4rem)
20: 80px (5rem)
24: 96px (6rem)
```

### Padding e Margin Padrões
```
Containers: px-4 py-8 (mobile), px-6 py-12 (desktop)
Cards: p-4 ou p-6
Card Header: p-4 ou p-6
Card Content: p-4 ou p-6
Sections: space-y-6 ou space-y-8
Lists: space-y-2 ou space-y-3
Grids: gap-4 ou gap-6
```

### Border Radius
```
sm: 6px (0.375rem)
md: 8px (0.5rem)
lg: 10px (0.625rem) - Padrão
xl: 14px (0.875rem)
2xl: 16px (1rem)
full: 9999px (circular)
```

---

## 🧩 Componentes

### 1. Botões (Button)

#### Variantes
**Primary (Padrão)**
```
Background: bg-primary
Text: text-primary-foreground
Hover: hover:bg-primary/90
Height: h-10 (40px)
Padding: px-4 py-2
Border Radius: rounded-lg
Font: font-medium
```

**Secondary**
```
Background: bg-secondary
Text: text-secondary-foreground
Hover: hover:bg-secondary/90
```

**Outline**
```
Border: border border-input
Background: bg-transparent
Text: text-foreground
Hover: hover:bg-accent hover:text-accent-foreground
```

**Ghost**
```
Background: bg-transparent
Text: text-foreground
Hover: hover:bg-accent hover:text-accent-foreground
```

**Destructive**
```
Background: bg-destructive
Text: text-destructive-foreground
Hover: hover:bg-destructive/90
```

#### Tamanhos
```
sm: h-9 px-3 text-sm
default: h-10 px-4 py-2
lg: h-11 px-8
icon: h-10 w-10 (quadrado)
```

---

### 2. Cards (Card)

#### Estrutura
```
Container: bg-card border border-border/50 rounded-lg
Card Header: p-6 space-y-1.5
Card Title: font-semibold text-lg
Card Description: text-sm text-muted-foreground
Card Content: p-6 pt-0
Card Footer: p-6 pt-0
```

#### Variações Especiais
**Card com Gradiente (Stats)**
```
bg-gradient-to-br from-primary/10 to-secondary/10
border-primary/20
```

**Card Hover (Interativo)**
```
hover:shadow-lg hover:border-primary/50
transition-all duration-300
```

---

### 3. Inputs (Input)

#### Input Padrão
```
Height: h-10 (40px)
Padding: px-3
Background: bg-input-background
Border: border border-input
Border Radius: rounded-md
Text: text-base
Placeholder: text-muted-foreground
Focus: focus:ring-2 focus:ring-ring
```

#### Textarea
```
Min Height: min-h-[80px]
Padding: px-3 py-2
Resize: resize-none ou resize-y
```

#### Select
```
Height: h-10
Background: bg-input-background
Border: border border-input
```

---

### 4. Avatar

#### Tamanhos
```
Small: w-8 h-8
Medium: w-10 h-10 (padrão)
Large: w-12 h-12
Extra Large: w-16 h-16
```

#### Avatar com Gradiente
```
AvatarFallback: bg-gradient-to-br from-primary to-secondary
Text: text-white font-semibold
```

---

### 5. Badge

#### Variantes
**Default**
```
Background: bg-primary
Text: text-primary-foreground
Padding: px-2.5 py-0.5
Font: text-xs font-semibold
Border Radius: rounded-full
```

**Secondary**
```
Background: bg-secondary
Text: text-secondary-foreground
```

**Outline**
```
Border: border border-input
Background: bg-transparent
```

**Destructive**
```
Background: bg-destructive
Text: text-destructive-foreground
```

---

### 6. Tabs

#### Tab List
```
Background: bg-muted
Padding: p-1
Border Radius: rounded-lg
Gap: gap-2
```

#### Tab Trigger
```
Height: h-9
Padding: px-3
Border Radius: rounded-md
Inactive: text-muted-foreground
Active: bg-background text-foreground shadow-sm
```

---

### 7. Dialog / Modal

#### Overlay
```
Background: bg-background/80 backdrop-blur-sm
```

#### Dialog Content
```
Background: bg-card
Border: border border-border
Max Width: max-w-lg (512px)
Padding: p-6
Border Radius: rounded-lg
Shadow: shadow-lg
```

---

### 8. Header / Navigation

#### Header Principal
```
Background: backdrop-blur-sm bg-card/50
Border: border-b border-border/50
Height: auto (padding-based)
Padding: py-4 px-4
Position: sticky top-0
Z-Index: z-50
```

#### Logo
```
Size: w-8 h-8
Background: bg-gradient-to-br from-primary to-secondary
Border Radius: rounded-lg
```

---

### 9. Category Cards (Landing Page)

#### Estrutura
```
Size: Responsivo (grid)
Background: bg-card
Border: border border-border/50
Border Radius: rounded-2xl
Padding: p-8
Hover: hover:border-primary/50 hover:shadow-lg
Transition: transition-all duration-300
```

#### Icon Container
```
Size: w-12 h-12
Background: bg-gradient-to-br from-{color} to-{color}
Border Radius: rounded-xl
Icon Size: w-6 h-6
Icon Color: text-white
```

---

### 10. Service Card

#### Estrutura
```
Background: bg-card
Border: border border-border/50
Border Radius: rounded-lg
Padding: p-0 (estruturado internamente)
Hover: hover:shadow-lg hover:border-primary/50
```

#### Card Image (se houver)
```
Height: h-48
Object Fit: object-cover
Border Radius: rounded-t-lg
```

#### Provider Info
```
Layout: flex items-center gap-3
Padding: p-4
```

---

### 11. Chat Message

#### Message Container
```
Max Width: max-w-[70%]
Border Radius: rounded-2xl
Padding: px-4 py-3
```

#### Sent (Current User)
```
Background: bg-primary
Text: text-primary-foreground
Align: justify-end
```

#### Received (Other User)
```
Background: bg-muted
Text: text-foreground
Align: justify-start
```

---

### 12. Payment Card

#### QR Code Container
```
Size: w-40 h-40
Background: bg-gradient-to-br from-primary via-secondary to-accent
Border Radius: rounded-lg
Padding: p-4 (container externo)
Background (externo): bg-white
Border Radius (externo): rounded-xl
```

#### PIX Code Display
```
Background: bg-muted
Padding: p-3
Border Radius: rounded-lg
Font: text-xs font-mono
Word Break: break-all
```

---

### 13. Rating Stars

#### Star Size
```
Small: w-3 h-3
Medium: w-4 h-4
Large: w-5 h-5
```

#### Star States
```
Filled: fill-accent text-accent
Empty: text-muted
```

---

### 14. Table

#### Table Container
```
Border: border border-border
Border Radius: rounded-lg
Overflow: overflow-hidden
```

#### Table Header
```
Background: bg-muted/50
Font: font-medium text-sm
Text: text-muted-foreground
Padding: px-4 py-3
```

#### Table Row
```
Border: border-b border-border/50
Hover: hover:bg-muted/50
Padding: px-4 py-3
```

---

## 📐 Layout e Grid

### Container Principal
```
Max Width: container mx-auto (1280px)
Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
```

### Grid Systems

#### Grid de Categorias (Landing)
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

#### Grid de Serviços
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

#### Grid de Stats (Dashboard)
```
grid grid-cols-1 md:grid-cols-3 gap-6
```

#### Chat Layout (3 colunas)
```
grid grid-cols-12 gap-6
Sidebar: col-span-12 lg:col-span-3
Main: col-span-12 lg:col-span-6
Summary: col-span-12 lg:col-span-3
```

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 🎯 Ícones

### Biblioteca
**Lucide React** - Ícones minimalistas e modernos

### Tamanhos Comuns
```
Small: w-4 h-4 (16px)
Medium: w-5 h-5 (20px)
Large: w-6 h-6 (24px)
Extra Large: w-8 h-8 (32px)
Icon Display: w-12 h-12 (48px)
```

### Ícones por Categoria

#### Categorias de Serviço
```
Frontend: Code
UX/UI: Palette
Backend: Server
IA: Brain
Dados: Database
```

#### Interface
```
Busca: Search
Menu: Menu
Fechar: X
Voltar: ArrowLeft
Estrela: Star
Mensagem: MessageSquare
Carrinho: ShoppingCart
Usuário: User
Configurações: Settings
Logout: LogOut
```

#### Ações
```
Adicionar: Plus
Editar: Edit
Deletar: Trash2
Enviar: Send
Copiar: Copy
Check: Check
Download: Download
Upload: Upload
```

#### Status
```
Sucesso: CheckCircle
Erro: XCircle
Atenção: AlertTriangle
Info: Info
```

#### Pagamento
```
PIX: QrCode
Cartão: CreditCard
Dinheiro: DollarSign
```

---

## 🎭 Estados e Interações

### Hover States

#### Botões
```
Opacity: hover:opacity-90
Scale: hover:scale-105 (em alguns casos)
Background: hover:bg-{color}/90
Transition: transition-all duration-200
```

#### Cards
```
Border: hover:border-primary/50
Shadow: hover:shadow-lg
Transform: hover:-translate-y-1 (em alguns casos)
Transition: transition-all duration-300
```

#### Links e Logo
```
Opacity: hover:opacity-80
Transition: transition-opacity
```

### Focus States
```
Ring: focus:ring-2 focus:ring-ring
Outline: focus:outline-none
Border: focus:border-primary
```

### Active States
```
Scale: active:scale-95
Opacity: active:opacity-80
```

### Disabled States
```
Opacity: opacity-50
Cursor: cursor-not-allowed
Pointer Events: pointer-events-none
```

### Loading States
```
Cursor: cursor-wait
Disabled: disabled
Text: "Processando..." ou "Carregando..."
```

### Animations

#### Fade In
```
Animation: animate-in fade-in
Duration: duration-200
```

#### Slide In
```
Animation: animate-in slide-in-from-bottom
Duration: duration-300
```

#### Transitions Globais
```
transition-all duration-200 ease-in-out
transition-colors duration-200
transition-opacity duration-200
```

---

## 📱 Páginas

### 1. Landing Page

#### Hero Section
```
Height: min-h-screen
Layout: flex items-center justify-center
Background: bg-background
Padding: px-4 py-12
```

#### Logo Display
```
Size: w-16 h-16
Background: bg-gradient-to-br from-primary to-secondary
Border Radius: rounded-2xl
Margin: mb-6
```

#### Title
```
Font: text-4xl md:text-5xl lg:text-6xl font-bold
Gradient Text: bg-gradient-to-r from-primary via-secondary to-accent
Background Clip: bg-clip-text text-transparent
Margin: mb-6
```

#### Subtitle
```
Font: text-lg md:text-xl
Color: text-muted-foreground
Max Width: max-w-2xl
Margin: mb-8
```

#### Categories Grid
```
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap: gap-6
Margin: mt-12
```

---

### 2. Login / Register

#### Container
```
Layout: flex items-center justify-center
Min Height: min-h-screen
Padding: p-4
```

#### Card
```
Width: w-full max-w-md
Padding: p-6
```

#### Form
```
Space: space-y-4
```

#### Logo (Absolute Position)
```
Position: absolute top-8 left-8
```

---

### 3. Client Dashboard

#### Header
```
Position: sticky top-0
Z-Index: z-50
Background: backdrop-blur-sm bg-card/50
Border: border-b border-border/50
```

#### Search Bar
```
Width: w-full max-w-2xl
Height: h-12
Background: bg-input-background
Border Radius: rounded-lg
```

#### Category Filters
```
Layout: flex items-center gap-2
Overflow: overflow-x-auto
Padding: py-4
```

#### Services Grid
```
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap: gap-6
Margin: mt-6
```

---

### 4. Provider Dashboard

#### Stats Cards
```
Grid: grid-cols-1 md:grid-cols-3
Gap: gap-6
Margin: mb-8
```

#### Tabs
```
Space: space-y-6
```

#### Orders Table
```
Width: w-full
Overflow: overflow-x-auto (mobile)
```

---

### 5. Provider Profile

#### Profile Header
```
Layout: flex items-start gap-6
Padding: p-6
Background: bg-card
Border: border border-border/50
Border Radius: rounded-lg
Margin: mb-6
```

#### Avatar
```
Size: w-24 h-24 md:w-32 md:h-32
```

#### Services Section
```
Grid: grid-cols-1 md:grid-cols-2
Gap: gap-6
```

---

### 6. Chat & Checkout

#### Layout (3 Colunas)
```
Conversations: col-span-3 (sidebar)
Chat/Payment: col-span-6 (main)
Summary: col-span-3 (sidebar)
```

#### Message Area
```
Height: h-[calc(100vh-280px)]
Overflow: overflow-y-auto
Padding: p-4
```

#### Message Input
```
Position: sticky bottom-0
Background: bg-card
Border: border-t border-border
Padding: p-4
```

#### Payment Methods Grid
```
Space: space-y-3
```

---

## 📊 Shadows

### Shadow Scale
```
sm: shadow-sm
default: shadow
md: shadow-md
lg: shadow-lg
xl: shadow-xl
2xl: shadow-2xl
```

### Uso
- Cards: shadow ou shadow-md
- Hover Cards: shadow-lg
- Modals: shadow-xl
- Dropdowns: shadow-lg

---

## 🎨 Opacity Scale

```
0: opacity-0
5: opacity-5
10: opacity-10
20: opacity-20
50: opacity-50
80: opacity-80
90: opacity-90
100: opacity-100
```

### Uso Comum
- Overlays: opacity-80
- Disabled: opacity-50
- Hover: opacity-90
- Borders: opacity-20 (rgba com secondary)

---

## 📝 Notas de Implementação para Figma

### 1. **Configuração Inicial**
   - Crie um novo arquivo no Figma
   - Configure as cores como "Styles" no Figma
   - Configure os text styles para tipografia
   - Configure os efeitos (shadows) como "Effect Styles"

### 2. **Auto Layout**
   - Use Auto Layout para botões (padding: 16px horizontal, 8px vertical)
   - Use Auto Layout para cards (padding: 24px)
   - Configure spacing entre elementos (4px, 8px, 16px, 24px)

### 3. **Components**
   - Crie variants para botões (Primary, Secondary, Outline, Ghost, Destructive)
   - Crie variants para badges (Default, Secondary, Outline, Destructive)
   - Crie variants para inputs (Default, Focus, Error)

### 4. **Constraints**
   - Use constraints para elementos que devem se adaptar
   - Configure min/max width para containers responsivos

### 5. **Plugins Úteis**
   - **Iconify**: Para importar ícones do Lucide
   - **Unsplash**: Para imagens placeholder
   - **Content Reel**: Para preencher com dados mock

### 6. **Breakpoints**
   - Crie frames para cada breakpoint: Mobile (375px), Tablet (768px), Desktop (1440px)

---

## ✅ Checklist para Replicação no Figma

### Fase 1: Fundação
- [ ] Configurar paleta de cores como Color Styles
- [ ] Configurar tipografia como Text Styles
- [ ] Configurar shadows como Effect Styles
- [ ] Configurar corner radius padrões
- [ ] Importar ícones do Lucide via Iconify

### Fase 2: Componentes Básicos
- [ ] Criar componente Button (com todas as variants)
- [ ] Criar componente Input
- [ ] Criar componente Badge
- [ ] Criar componente Avatar
- [ ] Criar componente Card
- [ ] Criar componente Tab

### Fase 3: Componentes Compostos
- [ ] Criar Header/Navigation
- [ ] Criar Category Card (Landing)
- [ ] Criar Service Card
- [ ] Criar Message Bubble (Chat)
- [ ] Criar Payment Card
- [ ] Criar Stats Card (Dashboard)

### Fase 4: Páginas
- [ ] Landing Page
- [ ] Login/Register
- [ ] Client Dashboard
- [ ] Provider Dashboard
- [ ] Provider Profile
- [ ] Chat & Checkout

---

## 📞 Contato e Suporte

Este Design System foi criado para o projeto **TechMarket** - Marketplace de Freelancers em Tecnologia.

Para dúvidas sobre implementação ou detalhes específicos, consulte o código-fonte da aplicação onde todos os componentes estão implementados funcionalmente.

---

**Versão:** 1.0  
**Data:** 2026  
**Tecnologias:** React, Tailwind CSS, Lucide Icons
