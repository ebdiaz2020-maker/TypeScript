// 🥋 KATA 1.3 — Migrá este archivo a Contador.tsx
//
// PISTA: este componente usa useState y eventos onClick.
// 1. Renombrá el archivo a Contador.tsx
// 2. Creá una interface ContadorProps (inicial?: number, paso?: number)
// 3. Fijate si useState necesita <tipo> o si lo infiere solo
// 4. Tipá los handlers de los botones
//
// Cuando termines, debe quedar SIN errores y SIN `any`.

import { useState } from "react";

export function Contador({ inicial = 0, paso = 1 }) {
  const [valor, setValor] = useState(inicial);

  const incrementar = () => setValor(valor + paso);
  const decrementar = () => setValor(valor - paso);
  const reiniciar = () => setValor(inicial);

  return (
    <div>
      <p>Valor actual: {valor}</p>
      <button onClick={incrementar}>+{paso}</button>
      <button onClick={decrementar}>-{paso}</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}
