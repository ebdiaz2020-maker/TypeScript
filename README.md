# 🧩 Clase 1 — TypeScript para React (Fundamentos)

# 📚 PARTE TEÓRICA

## 1. ¿Por qué TypeScript en React?

JavaScript no te avisa de los errores: te los muestra **en producción, con el usuario adentro**. TypeScript te los muestra **mientras escribís**.

### El bug clásico que TS atrapa gratis

```jsx
// JavaScript — esto NO falla hasta que el usuario hace click
function PerfilUsuario({ usuario }) {
  return <h1>Hola {usuario.nombre.toUpperCase()}</h1>;
}

// En algún lado, alguien lo usa así:
<PerfilUsuario usuario={null} />;
// 💥 Runtime: Cannot read properties of null (reading 'nombre')
```

```tsx
// TypeScript — esto falla AHORA, en tu editor, antes de guardar
type Usuario = { nombre: string };

function PerfilUsuario({ usuario }: { usuario: Usuario }) {
  return <h1>Hola {usuario.nombre.toUpperCase()}</h1>;
}

<PerfilUsuario usuario={null} />;
//                       ~~~~
// ❌ Type 'null' is not assignable to type 'Usuario'.
```

**La idea central:** TS no hace que tu app sea más rápida ni más linda. Hace que **una clase entera de bugs sea imposible de cometer**. El costo de un bug en producción (tiempo, plata, confianza del cliente) es enorme comparado con el segundo que tardás en tipar.

> 🗣️ **Demo en vivo:** el instructor introduce este bug en un componente del proyecto del Módulo 1 y muestra cómo el editor lo marca al instante.

---

## 2. Tipos básicos e inferencia

### Tipos primitivos

```ts
const nombre: string = "Ada";
const edad: number = 36;
const activo: boolean = true;
const nada: null = null;
const indefinido: undefined = undefined;

const numeros: number[] = [1, 2, 3];
const nombres: string[] = ["Ada", "Linus"];
```

### Inferencia: no tipes lo que TS ya sabe

TypeScript **deduce** el tipo solo. No hace falta escribirlo todo.

```ts
let contador = 0; // TS infiere: number
contador = "hola"; // ❌ Error: string no es number

const usuario = {
  // TS infiere el objeto completo
  nombre: "Ada",
  edad: 36,
};
```

> ✅ **Regla práctica:** dejá que TS infiera variables y valores de retorno simples. **Tipá explícitamente** las fronteras: props, parámetros de función, respuestas de API.

### `any` es la trampa

`any` apaga TypeScript. Si usás `any`, perdés todo el beneficio.

```ts
let dato: any = 5;
dato = "ahora soy string";
dato.metodoQueNoExiste(); // TS no se queja → bug en runtime
```

> 🚫 Si ves `any` en tu código (o en código que te dio la IA), es una **alarma**. Casi siempre se puede tipar mejor. Alternativa segura para "no sé el tipo todavía": `unknown`.

### `union` y `literal`

```ts
type Estado = "cargando" | "exito" | "error"; // solo estos 3 valores
let estado: Estado = "cargando";
estado = "fini"; // ❌ Error

type ID = string | number; // puede ser uno u otro
```

---

## 3. `interface` vs `type`

Las dos sirven para describir la forma de un objeto. La pregunta clásica del alumno: _¿cuál uso?_

```ts
interface Usuario {
  nombre: string;
  edad: number;
}

type UsuarioT = {
  nombre: string;
  edad: number;
};
```

|                          | `interface`    | `type`   |
| ------------------------ | -------------- | -------- |
| Objetos y props          | ✅             | ✅       |
| Unions (`A \| B`)        | ❌             | ✅       |
| Se puede extender        | ✅ (`extends`) | ✅ (`&`) |
| Se puede reabrir/mergear | ✅             | ❌       |

> ✅ **Regla práctica del curso (para no debatir 20 minutos):**
>
> - `interface` para **props de componentes y objetos del dominio**.
> - `type` para **uniones, intersecciones y alias** (`type Estado = "a" | "b"`).
>
> Lo importante es **ser consistente en el equipo**, no cuál es "mejor".

---

## 4. Tipar componentes de React

### Props

```tsx
interface BotonProps {
  texto: string;
  onClick: () => void;
}

function Boton({ texto, onClick }: BotonProps) {
  return <button onClick={onClick}>{texto}</button>;
}
```

### Props opcionales y valores por defecto

El `?` marca la prop como opcional. El default se pone al desestructurar.

```tsx
interface BotonProps {
  texto: string;
  variante?: "primario" | "secundario"; // opcional
}

function Boton({ texto, variante = "primario" }: BotonProps) {
  return <button className={variante}>{texto}</button>;
}
```

### `children` → se tipa con `ReactNode`

`ReactNode` cubre todo lo que React puede renderizar: texto, JSX, números, arrays, `null`.

```tsx
import { ReactNode } from "react";

interface CardProps {
  titulo: string;
  children: ReactNode; // cualquier cosa renderizable
}

function Card({ titulo, children }: CardProps) {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      {children}
    </div>
  );
}

// Uso:
<Card titulo="Hola">
  <p>Contenido libre acá adentro</p>
</Card>;
```

---

## 5. `useState` tipado

### Caso fácil: dejá que infiera

Si el valor inicial ya dice el tipo, **no escribas nada**.

```tsx
const [contador, setContador] = useState(0); // infiere number
const [nombre, setNombre] = useState(""); // infiere string
const [activo, setActivo] = useState(false); // infiere boolean
```

### Caso que necesita ayuda: el genérico `<>`

Cuando el inicial es `null` o `[]`, TS no sabe qué va a venir. Se lo decís con `useState<Tipo>`.

```tsx
interface Usuario {
  id: number;
  nombre: string;
}

// ❌ Sin tipar: TS cree que usuario es SIEMPRE null
const [usuario, setUsuario] = useState(null);

// ✅ Tipado: usuario es Usuario O null
const [usuario, setUsuario] = useState<Usuario | null>(null);

// ✅ Arrays vacíos: decile qué van a contener
const [usuarios, setUsuarios] = useState<Usuario[]>([]);
```

---

## 6. Tipar eventos (`onClick`, `onChange`, `onSubmit`)

Esto es lo que más cuesta al principio. Tip: **dejá que el editor te diga el tipo** (escribí el handler inline, pasá el mouse por encima, copiá el tipo).

```tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";

function Ejemplo() {
  const [texto, setTexto] = useState("");

  // Click en un botón
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("click", e.currentTarget);
  };

  // Cambio en un input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTexto(e.target.value);
  };

  // Envío de un formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enviado:", texto);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={texto} onChange={handleChange} />
      <button onClick={handleClick}>Enviar</button>
    </form>
  );
}
```

| Evento     | Tipo             | Elemento típico     |
| ---------- | ---------------- | ------------------- |
| `onClick`  | `MouseEvent<T>`  | `HTMLButtonElement` |
| `onChange` | `ChangeEvent<T>` | `HTMLInputElement`  |
| `onSubmit` | `FormEvent<T>`   | `HTMLFormElement`   |

> 💡 **Truco anti-memorización:** no memorices estos tipos. Escribí `onChange={(e) => ...}` inline, pasá el mouse sobre `e`, y el editor te dice exactamente qué poner.

---

## 7. `tsconfig.json` mínimo y por qué `strict: true`

`tsconfig.json` configura el compilador. Lo mínimo importante:

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "jsx": "react-jsx", // permite JSX sin importar React
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true, // 👈 EL MÁS IMPORTANTE
    "noUnusedLocals": true, // marca variables sin usar
    "skipLibCheck": true, // no chequear node_modules (más rápido)
  },
  "include": ["src"],
}
```

### ¿Por qué `strict: true` siempre?

`strict` enciende un paquete de chequeos. El más valioso: **`strictNullChecks`**, que te obliga a manejar `null` y `undefined` en vez de ignorarlos.

```ts
function saludar(nombre: string | null) {
  // strict: true → ❌ Object is possibly 'null'
  return nombre.toUpperCase();
}

// ✅ Forma correcta: manejar el caso null
function saludar(nombre: string | null) {
  if (nombre === null) return "Invitado";
  return nombre.toUpperCase();
}
```

> Sin `strict`, TS te deja escribir los mismos bugs que JavaScript. Apagar `strict` es **pagar el costo de TS sin recibir el beneficio**. En este curso va siempre en `true`.

---

## 8. Cómo leer un error de TypeScript (sin pánico)

Los errores de TS asustan por largos, pero tienen estructura. Leelo así:

```
Type 'string' is not assignable to type 'number'.
     └─ lo que TENÉS          └─ lo que se ESPERABA
```

Estrategia en 3 pasos:

1. **Primera línea**: dice "tengo X, esperaba Y". Ignorá el resto al principio.
2. **Mirá el subrayado** en el editor: te apunta al lugar exacto.
3. **Preguntate:** ¿el tipo está mal, o mi código está mal? Casi siempre el tipo tiene razón.

> En la **Kata 3** vas a romper tipos a propósito justamente para entrenar esto.

---

# 🤖 La IA como herramienta (consigna de hoy)

Para el trabajo post-clase vas a usar la IA así:

1. Tomá un error de tipo real de tu migración.
2. Pedile a la IA que **te explique qué significa** y que proponga **2 formas distintas** de resolverlo.
3. **Elegí una y justificá por qué** (en un comentario o en el commit).

> No se trata de copiar la respuesta. Se trata de que puedas decir _"elegí la opción A porque B"_. Eso es lo que la consultora busca: criterio, no copy-paste.

---

# 📦 Trabajo de proyecto (post-clase)

Sobre el **repositorio del proyecto** (el que arrastramos desde el Módulo 1):

1. Convertir el proyecto a TypeScript: renombrar el entrypoint, agregar `tsconfig.json`.
2. Tipar el **primer componente de pantalla** completo (props + estado + eventos).
3. Asegurar que **no quede ningún `any`**.
4. Commit con **conventional commits**:
   ```
   refactor: migrar entrypoint y primer componente a TypeScript
   ```

Entrega: link al commit + 1 párrafo explicando un error de tipo que encontraste y cómo lo resolviste.

---

## ✅ Checklist de salida de la clase

- [ ] Puedo explicar un bug que TS atrapa y JS no.
- [ ] Sé tipar props con `interface`.
- [ ] Sé tipar `children` con `ReactNode`.
- [ ] Sé cuándo `useState` necesita `<Tipo>` y cuándo no.
- [ ] Sé tipar `onClick`, `onChange`, `onSubmit`.
- [ ] Sé por qué `strict: true`.
- [ ] Leo un error de TS sin entrar en pánico.

➡️ **Siguiente paso:** abrí [`EJERCICIOS.md`](./EJERCICIOS.md) y arrancá con la Kata 1.
