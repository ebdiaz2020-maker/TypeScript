import { ReactNode } from "react";

interface IBotonProps {
  texto: string;
  onClick: () => void;
  variante?: "primario" | "secundario";
  className?: string;
  children?: ReactNode; // para permitir contenido dentro del botón
}

export default function Button({
  texto,
  onClick,
  variante = "primario",
  className = "",
  children,
}: IBotonProps) {
  return (
    <button onClick={onClick} className={`${variante} ${className}`}>
      {texto}
      {children}
    </button>
  );
}

<Button className="p-4 mb-2 bg-red-500" texto="Subir">
  <Icon name="upload" />
</Button>;

// ----------------
// | Subir [Icon] |
// ----------------

function Card({ children }: { children: ReactNode }) {
  return <div className="p-4 border">{children}</div>;
}

interface Usuario {
  id: number;
  nombre: string;
}

const [state, setstate] = useState<Usuario | null>(null);

const [usuarios, setUsuarios] = useState<Usuario[]>([]);

const [text, setText] = useState("");

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setTexto(event.target.value);
};
