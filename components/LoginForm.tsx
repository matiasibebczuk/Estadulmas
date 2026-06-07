"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white/70">Contraseña</span>
        <input
          className="field"
          name="password"
          type="password"
          placeholder="Ingresar contraseña"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="text-sm font-bold text-red-300">{error}</p> : null}
      <button className="primary-button w-full" type="submit" disabled={pending}>
        <LockKeyhole size={18} />
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
