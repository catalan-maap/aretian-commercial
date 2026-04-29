import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Nombre</label>
            <Input defaultValue="Pablo Roca" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Email</label>
            <Input defaultValue="pablo@aretian.com" type="email" />
          </div>
          <Button variant="primary">Guardar cambios</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integraciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Mapbox</p>
              <p className="text-xs text-slate-400">Token para el mapa global</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              NEXT_PUBLIC_MAPBOX_TOKEN
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Supabase</p>
              <p className="text-xs text-slate-400">Base de datos principal</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              DATABASE_URL
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">OpenAI</p>
              <p className="text-xs text-slate-400">Clasificación automática con IA</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              OPENAI_API_KEY
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variables de entorno necesarias</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-xs overflow-x-auto leading-relaxed">
{`# Base de datos (Supabase)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Mapbox (mapa global)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...

# OpenAI (IA)
OPENAI_API_KEY=sk-...

# Vercel Blob (presentaciones)
BLOB_READ_WRITE_TOKEN=vercel_blob_...`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
