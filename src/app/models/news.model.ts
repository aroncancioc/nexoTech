export interface NewsItem {
  id: number;
  titulo: string;
  categoria: string;
  categoriaCorta: string;
  resumen: string;
  fecha: string;
  lectura: number;
  imagen: string;
  imagenFallback: string;
  creditoImagen: string;
  fuenteImagen: string;
  destacada: boolean;
  contenido: string[];
  puntosClave: string[];
}

export interface NewsFormValue {
  titulo: string;
  categoria: string;
  resumen: string;
  contenido: string;
  lectura: number;
  imagen?: string;
}
