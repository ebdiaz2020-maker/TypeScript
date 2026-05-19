// 🥋 KATA 1.1 — Migrá este archivo a Saludo.tsx
//
// PISTA: este componente recibe props simples.
// 1. Renombrá el archivo a Saludo.tsx
// 2. Creá una interface SaludoProps
// 3. La prop `entusiasmo` es opcional y por defecto vale 1
//
// Cuando termines, debe quedar SIN errores y SIN `any`.

export function Saludo({ nombre, entusiasmo = 1 }) {
  const signos = "!".repeat(entusiasmo);
  return (
    <h2>
      Hola {nombre}
      {signos}
    </h2>
  );
}
