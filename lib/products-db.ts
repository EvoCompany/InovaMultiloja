import { createClient } from "@supabase/supabase-js";
import type { Produto, Categoria, Marca } from "./types";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const SELECT = "*, categorias(id, nome, slug), marcas(id, nome, slug)";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduto(p: any): Produto {
  return {
    id: p.id,
    nome: p.nome,
    slug: p.slug,
    sku: p.sku ?? undefined,
    descricaoCurta: p.descricao_curta ?? undefined,
    descricaoLonga: p.descricao_longa ?? undefined,
    categoriaId: p.categoria_id ?? undefined,
    marcaId: p.marca_id ?? undefined,
    preco: Number(p.preco),
    precoPromocional: p.preco_promocional ? Number(p.preco_promocional) : undefined,
    estoque: p.estoque ?? 0,
    imagemUrl: p.imagem_url ?? undefined,
    imagensExtras: Array.isArray(p.imagens_extras) ? p.imagens_extras : [],
    especificacoes: p.especificacoes ?? {},
    seoTitle: p.seo_title ?? undefined,
    seoDescription: p.seo_description ?? undefined,
    destaque: p.destaque ?? false,
    disponivel: p.disponivel ?? true,
    ativo: p.ativo ?? true,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    categoria: p.categorias
      ? { id: p.categorias.id, nome: p.categorias.nome, slug: p.categorias.slug }
      : undefined,
    marca: p.marcas
      ? { id: p.marcas.id, nome: p.marcas.nome, slug: p.marcas.slug }
      : undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategoria(c: any): Categoria {
  return {
    id: c.id,
    parentId: c.parent_id ?? undefined,
    nome: c.nome,
    slug: c.slug,
    imagemUrl: c.imagem_url ?? undefined,
    ordem: c.ordem ?? 0,
    ativo: c.ativo ?? true,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMarca(m: any): Marca {
  return {
    id: m.id,
    nome: m.nome,
    slug: m.slug,
    logoUrl: m.logo_url ?? undefined,
    ativo: m.ativo ?? true,
  };
}

export async function getDbAllProdutos(): Promise<Produto[]> {
  const { data } = await getSupabase()
    .from("produtos")
    .select(SELECT)
    .eq("ativo", true)
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduto);
}

export async function getDbFeaturedProdutos(): Promise<Produto[]> {
  const { data } = await getSupabase()
    .from("produtos")
    .select(SELECT)
    .eq("ativo", true)
    .eq("destaque", true)
    .order("created_at", { ascending: false })
    .limit(10);
  return (data ?? []).map(mapProduto);
}

export async function getDbProdutosByCategoria(slug: string): Promise<Produto[]> {
  const { data: cat } = await getSupabase()
    .from("categorias")
    .select("id")
    .eq("slug", slug)
    .single();
  if (!cat) return [];

  const { data } = await getSupabase()
    .from("produtos")
    .select(SELECT)
    .eq("ativo", true)
    .eq("categoria_id", cat.id)
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduto);
}

export async function getDbProdutoBySlug(slug: string): Promise<Produto | null> {
  const { data } = await getSupabase()
    .from("produtos")
    .select(SELECT)
    .eq("slug", slug)
    .single();
  return data ? mapProduto(data) : null;
}

export async function getDbRelatedProdutos(
  currentId: string,
  categoriaId: string,
  count = 4
): Promise<Produto[]> {
  const { data } = await getSupabase()
    .from("produtos")
    .select(SELECT)
    .eq("ativo", true)
    .eq("categoria_id", categoriaId)
    .neq("id", currentId)
    .limit(count);
  return (data ?? []).map(mapProduto);
}

export async function getDbAllProdutoSlugs(): Promise<string[]> {
  const { data } = await getSupabase()
    .from("produtos")
    .select("slug")
    .eq("ativo", true);
  return (data ?? []).map((p) => p.slug);
}

export async function getDbAllCategorias(): Promise<Categoria[]> {
  const { data } = await getSupabase()
    .from("categorias")
    .select("*")
    .eq("ativo", true)
    .order("ordem");
  return (data ?? []).map(mapCategoria);
}

export async function getDbCategoriaBySlug(slug: string): Promise<Categoria | null> {
  const { data } = await getSupabase()
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? mapCategoria(data) : null;
}

export async function getDbAllMarcas(): Promise<Marca[]> {
  const { data } = await getSupabase()
    .from("marcas")
    .select("*")
    .eq("ativo", true)
    .order("nome");
  return (data ?? []).map(mapMarca);
}

export async function getDbFeaturedCount(): Promise<number> {
  const { count } = await getSupabase()
    .from("produtos")
    .select("id", { count: "exact", head: true })
    .eq("destaque", true);
  return count ?? 0;
}
