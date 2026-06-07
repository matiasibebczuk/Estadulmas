import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { MatchForm } from "@/components/MatchForm";
import { requireAuth } from "@/lib/auth";

export default async function NewMatchPage() {
  await requireAuth();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-12 pt-5">
        <Link href="/dashboard" className="secondary-button mb-5">
          <ArrowLeft size={17} />
          Volver
        </Link>
        <MatchForm />
      </main>
    </>
  );
}
