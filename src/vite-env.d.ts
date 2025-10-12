/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NameCodepromo: string;
  // Ajoute ici d'autres variables d'environnement si besoin
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}