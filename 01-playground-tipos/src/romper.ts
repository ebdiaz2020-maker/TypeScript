// 🥋 KATA 3 — Romper un tipo y leer el error
//
// Timebox: 15 minutos.
//
// Para CADA ejercicio:
//   1. Descomentá / escribí el código que PROVOCA el error pedido.
//   2. Copiá el mensaje real del compilador en  // ERROR:
//   3. Explicá EN TUS PALABRAS qué significa en  // SIGNIFICA:
//   4. Arreglalo y dejá el arreglo en           // ARREGLO:
//
// Ejemplo resuelto (así se entrega cada uno):
//
//   let edad: number = 30;
//   // edad = "treinta";
//   // ERROR: Type 'string' is not assignable to type 'number'.
//   // SIGNIFICA: le puse texto a algo que tiene que ser número.
//   // ARREGLO: edad = 31;
//
// ⚠️ La explicación tiene que ser TUYA. Si la copiás de la IA tal cual,
//    no cuenta. En el cierre se elige gente al azar para que la explique.

// ═══════════════════════════════════════════════
// EJERCICIO 1 — Asignar string a un number
// ═══════════════════════════════════════════════
let edad: number = 25;
// TODO: provocá el error asignándole un string
// ERROR:
// SIGNIFICA:
// ARREGLO:

// ═══════════════════════════════════════════════
// EJERCICIO 2 — Llamar una función con argumento de tipo equivocado
// ═══════════════════════════════════════════════
function duplicar(n: number): number {
  return n * 2;
}
// TODO: llamá a duplicar() con un string
// ERROR:
// SIGNIFICA:
// ARREGLO:

// ═══════════════════════════════════════════════
// EJERCICIO 3 — Acceder a una propiedad que no existe en el objeto
// ═══════════════════════════════════════════════
interface Producto {
  nombre: string;
  precio: number;
}
const remera: Producto = { nombre: "Remera", precio: 5000 };
// TODO: accedé a remera.descuento (no existe)
// ERROR:
// SIGNIFICA:
// ARREGLO:

// ═══════════════════════════════════════════════
// EJERCICIO 4 — Olvidar manejar null (strictNullChecks)
// ═══════════════════════════════════════════════
function primeraLetra(texto: string | null): string {
  // TODO: hacé texto.charAt(0) SIN chequear null y mirá el error
  return "";
}
// ERROR:
// SIGNIFICA:
// ARREGLO:

// ═══════════════════════════════════════════════
// EJERCICIO 5 — Asignar un valor fuera de un union literal
// ═══════════════════════════════════════════════
type Talle = "S" | "M" | "L";
let miTalle: Talle = "M";
// TODO: asignale "XXL" a miTalle
// ERROR:
// SIGNIFICA:
// ARREGLO:

export {};
