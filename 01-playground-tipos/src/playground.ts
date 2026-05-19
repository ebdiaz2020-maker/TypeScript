// 🧪 PLAYGROUND DE TIPOS — calentamiento (no se entrega, es para jugar)
//
// Corré `npm run play` en otra terminal: te muestra errores en vivo.
// Cambiá cosas, rompé, arreglá. Es un sandbox.

// ─────────────────────────────────────────────
// 1. Inferencia: TS deduce solo
// ─────────────────────────────────────────────
let contador: number | null = null; // pasá el mouse por encima: TS dice "number"
contador = 100;
// contador = "hola"; // ← descomentá y mirá el error

// const usuario = {          // TS infiere el objeto completo
//   nombre: "Ada",
//   edad: 36,
// };
// interface Response {
//   status: number;
//   message: string;
//   data: any;
// }

// NO ES BUENA PRACTICA USAR ANY, PERO A VECES ES NECESARIO (ej: respuesta de una API)
// let dato: any = 5;
// dato = "ahora soy string";
// dato.metodoQueNoExiste();

// ─────────────────────────────────────────────
// 2. interface vs type
// ─────────────────────────────────────────────

type UsuarioT = {
  nombre: string;
  edad?: number; // propiedad opcional
};

type Estado = "activo" | "inactivo" | "pendiente";

interface Persona {
  nombre: string;
  edad: number;
  estado: Estado;
}

const ada: UsuarioT = { nombre: "Ada", edad: 36 };
const estado: Estado = "activo";
// const malo: Estado = "fini"; // ← descomentá: solo permite los 3 valores

// ─────────────────────────────────────────────
// 3. Funciones tipadas
// ─────────────────────────────────────────────
interface ISuma {
  a?: number;
  b?: number;
  c?: boolean;
  d?: number[];
}

function sumar({ a = 0, b = 0 }: ISuma): number {
  return a + b;
}

const total = sumar({}); // TS sabe que total es number
// sumar("2", 3); // ← descomentá y mirá el error

// ─────────────────────────────────────────────
// 4. Opcional y union
// ─────────────────────────────────────────────
function saludar(nombre: string, apodo?: string): string {
  return apodo ? `Hola ${apodo}` : `Hola ${nombre}`;
}

saludar("Grace");
saludar("Grace", "Amazing Grace");

// ─────────────────────────────────────────────
// 5. unknown vs any (por qué unknown es más seguro)
// ─────────────────────────────────────────────
let valorAny: any = 4;
valorAny.metodoInexistente(); // TS NO se queja → bug en runtime 😱

let valorUnknown: unknown = 4;
// valorUnknown.toFixed(2); // ← TS SÍ se queja: hay que verificar primero
if (typeof valorUnknown === "number") {
  valorUnknown.toFixed(2); // acá sí, ya sabemos que es number ✅
}

export {};
