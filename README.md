# Estadulmas

Dashboard deportivo mobile first para cargar y consultar estadísticas oficiales de Sulma FC.

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Funcionalidades

- Login con contraseña fija: `Tucasospollo07`
- Dashboard con PJ, Victorias, Empates, Derrotas, GF y GC
- Últimos partidos
- Alta de partidos con jugadores ilimitados
- Vista individual de partido
- Ranking de goleadores y asistidores
- Tabla completa por jugador con PJ, goles y asistencias

## Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
APP_PASSWORD=Tucasospollo07
SESSION_SECRET=change-this-long-random-secret
```

`SUPABASE_SERVICE_ROLE_KEY` nunca debe exponerse en el cliente. Esta app lo usa solo en Server Components y Server Actions.

## Supabase

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor.
3. Ejecutar [`supabase/schema.sql`](./supabase/schema.sql).
4. Copiar `Project URL` en `NEXT_PUBLIC_SUPABASE_URL`.
5. Copiar `service_role` en `SUPABASE_SERVICE_ROLE_KEY`.

Las tablas tienen RLS activado. El cliente anónimo no puede leer ni escribir directamente; la app opera desde servidor después del login.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Producción en Vercel

1. Subir el repositorio a GitHub.
2. Importar el proyecto en Vercel.
3. Configurar las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `APP_PASSWORD`
   - `SESSION_SECRET`
4. Deploy.

## Estructura

- `app/`: rutas de Next.js
- `components/`: UI reutilizable
- `lib/`: autenticación, Supabase, datos y formatos
- `supabase/schema.sql`: SQL completo con tablas, índices y RLS policies
