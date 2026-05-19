// 🥋 KATA 1.2 — Migrá este archivo a ListaUsuarios.tsx
//
// PISTA: este componente recibe un ARRAY DE OBJETOS.
// 1. Renombrá el archivo a ListaUsuarios.tsx
// 2. Creá una interface Usuario (id, nombre, email)
// 3. La prop `usuarios` es un Usuario[]
// 4. Tipá también el evento onClick del botón
//
// Cuando termines, debe quedar SIN errores y SIN `any`.

export function ListaUsuarios({ usuarios, onSeleccionar }) {
  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>
          <span>
            {u.nombre} — {u.email}
          </span>
          <button onClick={() => onSeleccionar(u.id)}>Seleccionar</button>
        </li>
      ))}
    </ul>
  );
}
