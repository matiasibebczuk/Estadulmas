import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { SulmaLogo } from "@/components/SulmaLogo";
import { isAuthenticated } from "@/lib/auth";

export default async function Home() {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <section className="w-full max-w-sm">
        <div className="panel overflow-hidden p-6">
          <div className="mx-auto w-fit">
            <SulmaLogo />
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-4xl font-black tracking-wide text-sulma-blanco">ESTADULMAS</h1>
            <p className="mt-2 text-sm font-semibold text-white/60">Estadísticas oficiales del equipo</p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
