// Este App usa los 3 componentes de la Kata 1.
//
// ⚠️ Al principio importa los .jsx. A medida que migrás cada componente
//    a .tsx, ACTUALIZÁ estos imports (sacá la extensión o apuntá al .tsx).
//
// Objetivo: cuando los 3 estén migrados, `npm run typecheck` pasa sin errores.

import { Saludo } from "./components/Saludo.jsx";
import { ListaUsuarios } from "./components/ListaUsuarios.jsx";
import { Contador } from "./components/Contador.jsx";

const usuarios = [
  { id: 1, nombre: "Ada Lovelace", email: "ada@correo.com" },
  { id: 2, nombre: "Linus Torvalds", email: "linus@correo.com" },
  { id: 3, nombre: "Grace Hopper", email: "grace@correo.com" },
];

export function App() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>🥋 Kata 1 — Migrar JSX → TSX</h1>

      <section>
        <Saludo nombre="Equipo" entusiasmo={3} />
      </section>

      <section>
        <h3>Usuarios</h3>
        <ListaUsuarios
          usuarios={usuarios}
          onSeleccionar={(id) => alert("Seleccionaste el usuario " + id)}
        />
      </section>

      <section>
        <h3>Contador</h3>
        <Contador inicial={10} paso={5} />
      </section>
    </main>
  );
}
