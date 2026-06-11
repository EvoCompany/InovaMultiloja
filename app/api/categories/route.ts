import { NextResponse } from "next/server";
import { getCategories, isWooCommerceConfigured } from "@/lib/woocommerce";

// Categorias de demonstração quando WooCommerce não está configurado
const demoCategories = [
  { id: 1, name: "Smartphones", slug: "smartphones", count: 25 },
  { id: 2, name: "Notebooks", slug: "notebooks", count: 18 },
  { id: 3, name: "Tablets", slug: "tablets", count: 12 },
  { id: 4, name: "Smartwatches", slug: "smartwatches", count: 15 },
  { id: 5, name: "Áudio", slug: "audio", count: 30 },
  { id: 6, name: "Câmeras", slug: "cameras", count: 8 },
  { id: 7, name: "Games", slug: "games", count: 22 },
  { id: 8, name: "Acessórios", slug: "acessorios", count: 45 },
];

export async function GET() {
  // Se WooCommerce não está configurado, retorna categorias de demonstração
  if (!isWooCommerceConfigured()) {
    return NextResponse.json({ 
      categories: demoCategories,
      source: "demo",
      message: "WooCommerce não configurado. Mostrando categorias de demonstração."
    });
  }

  try {
    const wooCategories = await getCategories({
      per_page: 100,
      hide_empty: true,
    });

    const categories = wooCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
      image: cat.image?.src,
    }));

    return NextResponse.json({ 
      categories,
      source: "woocommerce"
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias do WooCommerce" },
      { status: 500 }
    );
  }
}
