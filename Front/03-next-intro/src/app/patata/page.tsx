'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";



const PatataPage = () => {
    const router = useRouter();
    return (
      <div>
        <Link href="/patata/elsoldemisamores">
          Este lleva a una ruta dinámica
        </Link>
        <button
          onClick={() => {
            router.back();
          }}
        >
          Pa atras
        </button>
        <h2>Esto es la página patata y no la primera</h2>
        <Link href="/">Te lleva a la jome de nuevo</Link>
      </div>
    );
};

export default PatataPage;