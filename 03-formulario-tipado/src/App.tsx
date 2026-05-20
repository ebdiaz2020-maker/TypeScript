// 🥋 KATA 2 — Formulario controlado tipado
//
// Timebox: 25 minutos.
//
// COMPLETÁ los TODO. Al terminar, `npm run typecheck` pasa sin errores y SIN any.
//
// Requisitos:
//  - 1 interface para la forma del estado
//  - 1 solo useState con un OBJETO (no 4 useState sueltos)
//  - handleChange tipado que maneje TODOS los inputs
//  - handleSubmit tipado con preventDefault + console.log del objeto
//
// 🪤 TRAMPA: el checkbox NO usa e.target.value. Usa e.target.checked.
//    Si la IA te lo resuelve con .value, detectalo y corregilo.

import { useState, ChangeEvent, FormEvent } from "react";
// TODO: importá los tipos de eventos que necesites desde "react"
//       (pista: ChangeEvent, FormEvent)

// TODO 1: definí la interface del estado del formulario
//   campos: nombre (string), email (string), edad (number),
//           aceptaTerminos (boolean)
interface FormularioRegistro {
  // ...
  nombre: string;
  email: string;
  edad: number;
  aceptaTerminos: boolean;
}

const ESTADO_INICIAL: FormularioRegistro = {
  // TODO 2: valores iniciales coherentes con la interface
  nombre: "",
  email: "",
  edad: 0,
  aceptaTerminos: false
};

export function App() {
  // TODO 3: un solo useState tipado EXPLÍCITAMENTE con FormularioRegistro
  //   (sí, acá se podría inferir; lo tipamos explícito a propósito para
  //    documentar el contrato del formulario)
  const [form, setForm] = useState(ESTADO_INICIAL);
  useState<FormularioRegistro>(ESTADO_INICIAL);

  // TODO 4: handleChange tipado.
  //   Ojo: para el checkbox usá e.target.checked (boolean),
  //   para el resto e.target.value.
  //   Tip: e.target.type === "checkbox" para distinguir.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value
    });
  };

  // TODO 5: handleSubmit tipado. preventDefault + console.log(form)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 420 }}>
      <h1>🥋 Kata 2 — Registro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Edad
            <input
              name="edad"
              type="number"
              value={form.edad}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            <input
              name="aceptaTerminos"
              type="checkbox"
              checked={form.aceptaTerminos}
              onChange={handleChange}
            />
            Acepto los términos
          </label>
        </div>

        <button type="submit">Registrarme</button>
      </form>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </main>
  );
}
