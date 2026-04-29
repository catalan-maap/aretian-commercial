# Aretian Commercial Hub

CRM comercial, sistema de inteligencia de mercado y hub de presentaciones para **Aretian Urban Analytics & Design**.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 + Radix UI |
| Base de datos | Supabase (PostgreSQL) |
| ORM | Prisma 7 (adapter-pg) |
| Mapa | Mapbox GL JS |
| Autenticación | NextAuth.js v4 |
| Gráficos | Recharts |
| Iconos | Lucide React |
| Despliegue | Vercel |

---

## Módulos MVP

- **Dashboard** — KPIs, pipeline, gráficos de distribución por tipo y prioridad
- **Mapa Global** — Mapa interactivo con filtros por tipo y estado comercial
- **Clientes (CRM)** — Listado, filtros, ficha completa, CRUD
- **Oportunidades** — Pipeline Kanban + vista lista con métricas
- **Noticias** — Módulo de inteligencia comercial con clasificación por relevancia
- **Presentaciones** — Repositorio de decks con filtros por idioma, tipo y sector
- **Tareas** — Lista de tareas agrupadas por estado con fechas límite

---

## Configuración local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Copia `.env.local.example` a `.env.local` y rellena los valores:

```bash
cp .env.local.example .env.local
```

Variables necesarias:

```env
# Supabase / PostgreSQL
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres

# Auth
NEXTAUTH_SECRET=tu-secret-aleatorio-minimo-32-chars
NEXTAUTH_URL=http://localhost:3000

# Mapbox (mapa interactivo)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...

# OpenAI (IA - Fase 2)
OPENAI_API_KEY=sk-proj-...
```

> **Sin base de datos:** La app funciona en modo demo con datos mock. Solo las API routes requieren DB.

### 3. Base de datos (Supabase)

```bash
npm run db:generate   # Generar cliente Prisma
npm run db:push       # Crear tablas en la BD
npm run db:seed       # Cargar datos de ejemplo
npm run db:studio     # Explorar BD visualmente
```

### 4. Arrancar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura de carpetas

```
aretian-commercial/
├── prisma/
│   ├── schema.prisma       # Modelo de datos completo
│   └── seed.ts             # Datos semilla
├── prisma.config.ts        # Configuración Prisma 7
├── src/
│   ├── app/
│   │   ├── (dashboard)/    # Páginas principales
│   │   │   ├── dashboard/  # KPIs + gráficos
│   │   │   ├── map/        # Mapa Mapbox
│   │   │   ├── clients/    # CRM listado
│   │   │   │   └── [id]/   # Ficha de cliente
│   │   │   ├── opportunities/  # Pipeline Kanban
│   │   │   ├── news/       # Inteligencia comercial
│   │   │   ├── presentations/  # Repositorio
│   │   │   ├── tasks/      # Tareas
│   │   │   └── settings/   # Config + env vars
│   │   └── api/
│   │       ├── clients/    # REST: GET, POST
│   │       ├── clients/[id]/  # REST: GET, PATCH, DELETE
│   │       ├── opportunities/
│   │       └── search/     # Búsqueda global
│   ├── components/
│   │   ├── ui/             # Badge, Button, Card, Input, Select, Dialog
│   │   ├── layout/         # Sidebar, Header
│   │   ├── dashboard/      # PipelineChart, TypeChart (Recharts)
│   │   ├── clients/        # NewClientDialog
│   │   └── map/            # GlobalMap (Mapbox GL JS)
│   ├── lib/
│   │   ├── prisma.ts       # Cliente Prisma singleton
│   │   ├── utils.ts        # Helpers + colores de estado
│   │   └── data.ts         # Mock data para demo
│   └── types/
│       └── index.ts        # Tipos TypeScript + labels
└── .env.local.example
```

---

## Despliegue en Vercel

```bash
vercel --prod
```

O importa el repositorio desde el panel de Vercel y añade las variables de entorno:

- `DATABASE_URL` — Supabase connection string
- `NEXTAUTH_SECRET` — Secret aleatorio
- `NEXTAUTH_URL` — URL de producción
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Token de Mapbox

---

## Modelo de datos

| Entidad | Descripción |
|---|---|
| `Organization` | Clientes, leads, partners — entidad central |
| `Contact` | Personas de contacto |
| `Opportunity` | Pipeline con etapas y valor estimado |
| `NewsItem` | Noticias con relevancia y tipo de oportunidad |
| `Presentation` | Repositorio de decks comerciales |
| `Task` | Tareas comerciales vinculadas |
| `Interaction` | Historial de llamadas, emails, reuniones |
| `User` | Usuarios con roles (ADMIN, BD, PARTNER, VIEWER) |
| `Tag` | Etiquetas transversales |

---

## Roadmap Fase 2

- [ ] Auth con NextAuth (Google OAuth)
- [ ] Roles y permisos por página
- [ ] Clasificación IA de noticias con OpenAI
- [ ] Subida de presentaciones a Vercel Blob
- [ ] Recomendación automática de presentaciones
- [ ] Resumen semanal de inteligencia (email con Resend)
- [ ] RSS feed crawler automático (Vercel Cron)
- [ ] Generador de emails de outreach con IA
- [ ] Búsqueda global avanzada
- [ ] Exportación CSV/Excel

---

*Aretian Urban Analytics & Design — [aretian.com](https://aretian.com)*
