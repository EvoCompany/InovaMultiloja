import { NextRequest, NextResponse } from "next/server";
import { getProducts, convertToSiteProduct, isWooCommerceConfigured } from "@/lib/woocommerce";

// Produtos de demonstração quando WooCommerce não está configurado
const demoProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 7999.99,
    originalPrice: 8999.99,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    category: "Smartphones",
    isNew: true,
    discount: 11,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 6499.99,
    originalPrice: 7299.99,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    category: "Smartphones",
    isNew: true,
    discount: 11,
  },
  {
    id: 3,
    name: "MacBook Pro 14 M3 Pro",
    price: 14999.99,
    originalPrice: 16999.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Notebooks",
    isFeatured: true,
    discount: 12,
  },
  {
    id: 4,
    name: "Apple Watch Series 9 45mm",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    category: "Smartwatches",
    isNew: true,
  },
  {
    id: 5,
    name: "AirPods Pro 2ª Geração",
    price: 1899.99,
    originalPrice: 2299.99,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    category: "Áudio",
    discount: 17,
  },
  {
    id: 6,
    name: "iPad Pro 12.9 M2 256GB",
    price: 9499.99,
    originalPrice: 10999.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "Tablets",
    discount: 14,
  },
  {
    id: 7,
    name: "PlayStation 5 Digital Edition",
    price: 3299.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    category: "Games",
    isFeatured: true,
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    price: 2199.99,
    originalPrice: 2799.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    category: "Áudio",
    discount: 21,
  },
  {
    id: 9,
    name: "GoPro Hero 12 Black",
    price: 2999.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    category: "Câmeras",
    isNew: true,
  },
  {
    id: 10,
    name: "Carregador MagSafe 15W",
    price: 349.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Acessórios",
    discount: 22,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Se WooCommerce não está configurado, retorna produtos de demonstração
  if (!isWooCommerceConfigured()) {
    let products = [...demoProducts];
    
    // Filtros básicos para demonstração
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const onSale = searchParams.get("on_sale");
    
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      products = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (featured === "true") {
      products = products.filter(p => p.isFeatured);
    }
    
    if (onSale === "true") {
      products = products.filter(p => p.discount);
    }
    
    return NextResponse.json({ 
      products,
      source: "demo",
      message: "WooCommerce não configurado. Mostrando produtos de demonstração."
    });
  }

  try {
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "20");
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") ? parseInt(searchParams.get("category")!) : undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;
    const onSale = searchParams.get("on_sale") === "true" ? true : undefined;

    const wooProducts = await getProducts({
      page,
      per_page: perPage,
      search,
      category,
      featured,
      on_sale: onSale,
    });

    const products = wooProducts.map(convertToSiteProduct);

    return NextResponse.json({ 
      products,
      source: "woocommerce"
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos do WooCommerce" },
      { status: 500 }
    );
  }
}
