export interface Produto {
  id: string;
  nome: string;
  slug: string;
  sku?: string;
  descricaoCurta?: string;
  descricaoLonga?: string;
  categoriaId?: string;
  marcaId?: string;
  preco: number;
  precoPromocional?: number;
  estoque: number;
  imagemUrl?: string;
  imagensExtras: string[];
  especificacoes: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  destaque: boolean;
  disponivel: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  categoria?: { id: string; nome: string; slug: string };
  marca?: { id: string; nome: string; slug: string };
}

export interface Categoria {
  id: string;
  parentId?: string;
  nome: string;
  slug: string;
  imagemUrl?: string;
  ordem: number;
  ativo: boolean;
}

export interface Marca {
  id: string;
  nome: string;
  slug: string;
  logoUrl?: string;
  ativo: boolean;
}

export interface Lead {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
  mensagem?: string;
  produtoId?: string;
  status: "novo" | "em_contato" | "fechado" | "perdido";
  createdAt: string;
}
