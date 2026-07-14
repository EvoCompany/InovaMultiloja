export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categorySlug: string;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export const categoryMeta: Record<string, { label: string; description: string; brands: string[] }> = {
  smartphones: {
    label: "Smartphones",
    description: "Os melhores smartphones com os melhores preços.",
    brands: ["iPhone", "Samsung", "Xiaomi", "Motorola"],
  },
  notebooks: {
    label: "Notebooks",
    description: "Notebooks para trabalho, estudo e games.",
    brands: ["MacBook", "Dell", "ASUS", "Lenovo", "HP"],
  },
  tablets: {
    label: "Tablets",
    description: "Tablets para produtividade e entretenimento.",
    brands: ["iPad", "Samsung Tab", "Xiaomi Pad"],
  },
  smartwatches: {
    label: "Smartwatches",
    description: "Smartwatches conectados para seu estilo de vida.",
    brands: ["Apple Watch", "Samsung Galaxy Watch"],
  },
  audio: {
    label: "Áudio",
    description: "Fones, caixas de som e muito mais.",
    brands: ["AirPods", "Sony", "JBL"],
  },
  cameras: {
    label: "Câmeras",
    description: "Câmeras para fotografia e vídeo profissional.",
    brands: ["Canon", "Nikon", "GoPro", "DJI"],
  },
  games: {
    label: "Games",
    description: "Consoles, jogos e acessórios para gamers.",
    brands: ["PlayStation", "Xbox", "Nintendo"],
  },
  acessorios: {
    label: "Acessórios",
    description: "Capas, carregadores, hubs e muito mais.",
    brands: ["Apple", "Xiaomi", "Genérico"],
  },
};

export const allProducts: Product[] = [
  // ── Smartphones ──────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'iPhone 16 Pro Max 256GB 5G - Tela Super Retina XDR 6.9" - Titânio Preto',
    price: 9999.0,
    originalPrice: 11499.0,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    category: "iPhone",
    categorySlug: "smartphones",
    isNew: true,
    isFeatured: true,
    discount: 13,
  },
  {
    id: 2,
    name: "iPhone 15 128GB 5G - Preto",
    price: 4999.0,
    originalPrice: 5499.0,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "iPhone",
    categorySlug: "smartphones",
    discount: 9,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray",
    price: 7499.0,
    originalPrice: 8299.0,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "Samsung",
    categorySlug: "smartphones",
    isNew: true,
    discount: 10,
  },
  {
    id: 4,
    name: "Xiaomi 14 Ultra 512GB - Preto",
    price: 5999.0,
    originalPrice: 6999.0,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    category: "Xiaomi",
    categorySlug: "smartphones",
    isNew: true,
    discount: 14,
  },
  {
    id: 5,
    name: "iPhone 14 Pro 256GB - Roxo Profundo",
    price: 5299.0,
    originalPrice: 5999.0,
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop",
    category: "iPhone",
    categorySlug: "smartphones",
    discount: 12,
  },
  {
    id: 6,
    name: "Motorola Edge 50 Pro 512GB - Preto",
    price: 3499.0,
    originalPrice: 3999.0,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Motorola",
    categorySlug: "smartphones",
    discount: 13,
  },
  {
    id: 7,
    name: "Samsung Galaxy A55 256GB - Azul",
    price: 2499.0,
    originalPrice: 2999.0,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
    category: "Samsung",
    categorySlug: "smartphones",
    isNew: true,
    discount: 17,
  },
  {
    id: 8,
    name: "Xiaomi Redmi Note 13 Pro 256GB - Preto",
    price: 1799.0,
    originalPrice: 2199.0,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    category: "Xiaomi",
    categorySlug: "smartphones",
    discount: 18,
  },

  // ── Notebooks ─────────────────────────────────────────────────────────────────
  {
    id: 101,
    name: 'MacBook Pro M4 14" 18GB RAM 512GB SSD - Space Black',
    price: 14999.0,
    originalPrice: 16499.0,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    category: "MacBook",
    categorySlug: "notebooks",
    isNew: true,
    isFeatured: true,
    discount: 9,
  },
  {
    id: 102,
    name: 'MacBook Air M4 13.6" 16GB RAM 512GB SSD - Estelar',
    price: 8499.0,
    originalPrice: 9299.0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "MacBook",
    categorySlug: "notebooks",
    isNew: true,
    discount: 9,
  },
  {
    id: 103,
    name: "Dell XPS 15 Intel Core i9 32GB RAM 1TB SSD",
    price: 12499.0,
    originalPrice: 13999.0,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
    category: "Dell",
    categorySlug: "notebooks",
    discount: 11,
  },
  {
    id: 104,
    name: "ASUS ROG Strix G16 RTX 5070 32GB RAM 1TB SSD",
    price: 15999.0,
    originalPrice: 17999.0,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    category: "ASUS",
    categorySlug: "notebooks",
    isNew: true,
    discount: 11,
  },
  {
    id: 105,
    name: "Lenovo ThinkPad X1 Carbon Gen 12 16GB RAM 512GB",
    price: 10999.0,
    originalPrice: 12499.0,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    category: "Lenovo",
    categorySlug: "notebooks",
    discount: 12,
  },
  {
    id: 106,
    name: 'HP Spectre x360 14" Intel Evo 16GB RAM 1TB SSD',
    price: 9499.0,
    originalPrice: 10499.0,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "HP",
    categorySlug: "notebooks",
    discount: 10,
  },
  {
    id: 107,
    name: "Acer Aspire 5 Intel Core i5 8GB RAM 512GB SSD",
    price: 3299.0,
    originalPrice: 3799.0,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop",
    category: "ASUS",
    categorySlug: "notebooks",
    discount: 13,
  },
  {
    id: 108,
    name: "Samsung Galaxy Book4 Pro Intel Core i7 16GB RAM",
    price: 7999.0,
    originalPrice: 8999.0,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    category: "Dell",
    categorySlug: "notebooks",
    isNew: true,
    discount: 11,
  },

  // ── Tablets ───────────────────────────────────────────────────────────────────
  {
    id: 201,
    name: 'iPad Pro M4 11" WiFi 256GB - Cinza Espacial',
    price: 8299.0,
    originalPrice: 8999.0,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "iPad",
    categorySlug: "tablets",
    isNew: true,
    isFeatured: true,
    discount: 8,
  },
  {
    id: 202,
    name: 'iPad Air M2 11" 128GB - Azul',
    price: 5499.0,
    originalPrice: 5999.0,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
    category: "iPad",
    categorySlug: "tablets",
    discount: 8,
  },
  {
    id: 203,
    name: "iPad 10ª Geração 64GB - Prata",
    price: 3299.0,
    originalPrice: 3699.0,
    image: "https://images.unsplash.com/photo-1589739900296-fdadc7f0db4b?w=400&h=400&fit=crop",
    category: "iPad",
    categorySlug: "tablets",
    discount: 11,
  },
  {
    id: 204,
    name: "Samsung Galaxy Tab S9 Ultra 256GB - Grafite",
    price: 6999.0,
    originalPrice: 7999.0,
    image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400&h=400&fit=crop",
    category: "Samsung Tab",
    categorySlug: "tablets",
    isNew: true,
    discount: 13,
  },
  {
    id: 205,
    name: "Samsung Galaxy Tab A9+ 128GB - Grafite",
    price: 2199.0,
    originalPrice: 2499.0,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&h=400&fit=crop",
    category: "Samsung Tab",
    categorySlug: "tablets",
    discount: 12,
  },
  {
    id: 206,
    name: "Xiaomi Pad 6 Pro 256GB - Preto",
    price: 2899.0,
    originalPrice: 3299.0,
    image: "https://images.unsplash.com/photo-1632363778884-4b43de44cd7e?w=400&h=400&fit=crop",
    category: "Xiaomi Pad",
    categorySlug: "tablets",
    isNew: true,
    discount: 12,
  },

  // ── Smartwatches ──────────────────────────────────────────────────────────────
  {
    id: 301,
    name: "Apple Watch Ultra 2 49mm GPS + Celular - Pulseira Ocean",
    price: 6499.0,
    originalPrice: 7199.0,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    category: "Apple Watch",
    categorySlug: "smartwatches",
    isNew: true,
    isFeatured: true,
    discount: 10,
  },
  {
    id: 302,
    name: "Apple Watch Series 10 45mm GPS - Alumínio Prateado",
    price: 4299.0,
    originalPrice: 4799.0,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    category: "Apple Watch",
    categorySlug: "smartwatches",
    isNew: true,
    discount: 10,
  },
  {
    id: 303,
    name: "Apple Watch SE 2 44mm GPS - Alumínio Meia-Noite",
    price: 2499.0,
    originalPrice: 2799.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Apple Watch",
    categorySlug: "smartwatches",
    discount: 11,
  },
  {
    id: 304,
    name: "Samsung Galaxy Watch 7 44mm - Verde",
    price: 2299.0,
    originalPrice: 2699.0,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    category: "Samsung Galaxy Watch",
    categorySlug: "smartwatches",
    isNew: true,
    discount: 15,
  },
  {
    id: 305,
    name: "Samsung Galaxy Watch Ultra 47mm - Titânio Branco",
    price: 3999.0,
    originalPrice: 4599.0,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    category: "Samsung Galaxy Watch",
    categorySlug: "smartwatches",
    discount: 13,
  },
  {
    id: 306,
    name: "Garmin Forerunner 965 GPS Running Smartwatch",
    price: 4899.0,
    originalPrice: 5499.0,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
    category: "Apple Watch",
    categorySlug: "smartwatches",
    discount: 11,
  },

  // ── Áudio ─────────────────────────────────────────────────────────────────────
  {
    id: 401,
    name: "AirPods Pro 2 com Estojo de Recarga MagSafe USB-C",
    price: 1799.0,
    originalPrice: 2099.0,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    category: "AirPods",
    categorySlug: "audio",
    isFeatured: true,
    discount: 14,
  },
  {
    id: 402,
    name: "AirPods 4 com Cancelamento de Ruído Ativo",
    price: 1299.0,
    originalPrice: 1499.0,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&h=400&fit=crop",
    category: "AirPods",
    categorySlug: "audio",
    isNew: true,
    discount: 13,
  },
  {
    id: 403,
    name: "Sony WH-1000XM5 Fone Over-Ear com ANC",
    price: 2199.0,
    originalPrice: 2599.0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Sony",
    categorySlug: "audio",
    discount: 15,
  },
  {
    id: 404,
    name: "JBL Tune 770NC Fone Bluetooth com ANC",
    price: 699.0,
    originalPrice: 799.0,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    category: "JBL",
    categorySlug: "audio",
    discount: 13,
  },
  {
    id: 405,
    name: "Samsung Galaxy Buds3 Pro - Prata",
    price: 999.0,
    originalPrice: 1199.0,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=400&h=400&fit=crop",
    category: "Sony",
    categorySlug: "audio",
    isNew: true,
    discount: 17,
  },
  {
    id: 406,
    name: "Bose QuietComfort 45 Fone Over-Ear Bluetooth",
    price: 1899.0,
    originalPrice: 2299.0,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    category: "Sony",
    categorySlug: "audio",
    discount: 17,
  },

  // ── Câmeras ───────────────────────────────────────────────────────────────────
  {
    id: 501,
    name: "Canon EOS R6 Mark II Mirrorless Full-Frame",
    price: 14999.0,
    originalPrice: 16999.0,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    category: "Canon",
    categorySlug: "cameras",
    isFeatured: true,
    discount: 12,
  },
  {
    id: 502,
    name: "Nikon Z6 III Mirrorless Full-Frame 24.5MP",
    price: 18999.0,
    originalPrice: 21999.0,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop",
    category: "Nikon",
    categorySlug: "cameras",
    isNew: true,
    discount: 14,
  },
  {
    id: 503,
    name: "GoPro Hero 13 Black Action Camera 5.3K",
    price: 2499.0,
    originalPrice: 2799.0,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=400&fit=crop",
    category: "GoPro",
    categorySlug: "cameras",
    isNew: true,
    discount: 11,
  },
  {
    id: 504,
    name: "DJI Osmo Action 5 Pro Action Camera 4K",
    price: 2299.0,
    originalPrice: 2699.0,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    category: "DJI",
    categorySlug: "cameras",
    isNew: true,
    discount: 15,
  },
  {
    id: 505,
    name: "Canon EOS Rebel SL3 DSLR 24.1MP WiFi",
    price: 4999.0,
    originalPrice: 5799.0,
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&h=400&fit=crop",
    category: "Canon",
    categorySlug: "cameras",
    discount: 14,
  },
  {
    id: 506,
    name: "Sony ZV-E10 II Mirrorless APS-C para Criadores",
    price: 6499.0,
    originalPrice: 7499.0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    category: "Nikon",
    categorySlug: "cameras",
    isNew: true,
    discount: 13,
  },

  // ── Games ─────────────────────────────────────────────────────────────────────
  {
    id: 601,
    name: "PlayStation 5 Slim 1TB - Branco",
    price: 3999.0,
    originalPrice: 4499.0,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    category: "PlayStation",
    categorySlug: "games",
    isFeatured: true,
    discount: 11,
  },
  {
    id: 602,
    name: "Xbox Series X 1TB - Preto",
    price: 4299.0,
    originalPrice: 4999.0,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    category: "Xbox",
    categorySlug: "games",
    discount: 14,
  },
  {
    id: 603,
    name: "Nintendo Switch 2 - Vermelho/Azul",
    price: 3499.0,
    originalPrice: 3999.0,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
    category: "Nintendo",
    categorySlug: "games",
    isNew: true,
    discount: 13,
  },
  {
    id: 604,
    name: "Controle DualSense PlayStation 5 - Branco",
    price: 499.0,
    originalPrice: 579.0,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop",
    category: "PlayStation",
    categorySlug: "games",
    discount: 14,
  },
  {
    id: 605,
    name: "Headset HyperX Cloud Alpha Gaming - Vermelho",
    price: 699.0,
    originalPrice: 799.0,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
    category: "Xbox",
    categorySlug: "games",
    discount: 13,
  },
  {
    id: 606,
    name: 'Monitor Gamer ASUS TUF Gaming 27" 165Hz IPS',
    price: 2199.0,
    originalPrice: 2599.0,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop",
    category: "Xbox",
    categorySlug: "games",
    discount: 15,
  },

  // ── Acessórios ────────────────────────────────────────────────────────────────
  {
    id: 701,
    name: "Apple Magic Keyboard com Touch ID - Branco",
    price: 1499.0,
    originalPrice: 1699.0,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    category: "Apple",
    categorySlug: "acessorios",
    isFeatured: true,
    discount: 12,
  },
  {
    id: 702,
    name: "Carregador MagSafe 15W Original Apple",
    price: 399.0,
    originalPrice: 449.0,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Apple",
    categorySlug: "acessorios",
    discount: 11,
  },
  {
    id: 703,
    name: "Capa de Silicone iPhone 16 Pro Max - Azul",
    price: 399.0,
    originalPrice: 449.0,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    category: "Apple",
    categorySlug: "acessorios",
    isNew: true,
    discount: 11,
  },
  {
    id: 704,
    name: "Pulseira Sport Apple Watch 45mm - Verde",
    price: 349.0,
    originalPrice: 399.0,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    category: "Apple",
    categorySlug: "acessorios",
    discount: 13,
  },
  {
    id: 705,
    name: "Hub USB-C 7 em 1 - HDMI 4K, USB 3.0, SD Card",
    price: 299.0,
    originalPrice: 349.0,
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop",
    category: "Xiaomi",
    categorySlug: "acessorios",
    discount: 14,
  },
  {
    id: 706,
    name: "Apple Pencil Pro - Branco",
    price: 1299.0,
    originalPrice: 1499.0,
    image: "https://images.unsplash.com/photo-1583394293253-a2581bd8888d?w=400&h=400&fit=crop",
    category: "Apple",
    categorySlug: "acessorios",
    isNew: true,
    discount: 13,
  },
  {
    id: 707,
    name: "Suporte MagSafe para iPhone - Mesa",
    price: 249.0,
    originalPrice: 299.0,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop",
    category: "Genérico",
    categorySlug: "acessorios",
    discount: 17,
  },
  {
    id: 708,
    name: "Película de Vidro iPhone 16 Pro - Transparente",
    price: 99.0,
    originalPrice: 129.0,
    image: "https://images.unsplash.com/photo-1544866092-1677b15d7f13?w=400&h=400&fit=crop",
    category: "Genérico",
    categorySlug: "acessorios",
    discount: 23,
  },
];

export function getProductsByCategory(slug: string): Product[] {
  return allProducts.filter((p) => p.categorySlug === slug);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.isFeatured || p.isNew).slice(0, 5);
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getRelatedProducts(currentId: number, categorySlug: string, count = 4): Product[] {
  return allProducts
    .filter((p) => p.categorySlug === categorySlug && p.id !== currentId)
    .slice(0, count);
}

export function getProductSpecs(product: Product): Record<string, string> {
  const name = product.name.toLowerCase();
  const base: Record<string, string> = {
    Marca: product.category,
    Condição: "Novo",
    Garantia: "12 meses",
  };

  if (product.categorySlug === "smartphones") {
    const storage = name.match(/(\d+)gb/i)?.[1];
    const ram = name.match(/(\d+)gb\s*ram/i)?.[1];
    return {
      ...base,
      Armazenamento: storage ? `${storage}GB` : "256GB",
      RAM: ram ? `${ram}GB` : "8GB",
      Conectividade: name.includes("5g") ? "5G / Wi-Fi / Bluetooth" : "4G / Wi-Fi / Bluetooth",
      "Sistema Operacional": name.includes("iphone") ? "iOS 18" : "Android 14",
      Bateria: "4500 mAh (aprox.)",
    };
  }
  if (product.categorySlug === "notebooks") {
    const ram = name.match(/(\d+)gb\s*ram/i)?.[1];
    const storage = name.match(/(\d+)(?:tb|gb)\s*ssd/i);
    return {
      ...base,
      Processador: name.includes("m4") ? "Apple M4" : name.includes("i9") ? "Intel Core i9" : name.includes("i7") ? "Intel Core i7" : "AMD Ryzen 7",
      RAM: ram ? `${ram}GB` : "16GB",
      Armazenamento: storage ? `${storage[1]}${storage[0].includes("tb") ? "TB" : "GB"} SSD` : "512GB SSD",
      "Sistema Operacional": name.includes("macbook") ? "macOS Sequoia" : "Windows 11 Home",
      Tela: name.includes('14"') ? '14"' : name.includes('15"') ? '15"' : name.includes('16"') ? '16"' : '13"',
    };
  }
  if (product.categorySlug === "tablets") {
    const storage = name.match(/(\d+)gb/i)?.[1];
    return {
      ...base,
      Armazenamento: storage ? `${storage}GB` : "128GB",
      Conectividade: name.includes("wifi") ? "Wi-Fi" : "Wi-Fi + Celular",
      "Sistema Operacional": name.includes("ipad") ? "iPadOS 18" : "Android 14",
      Bateria: "8000 mAh (aprox.)",
    };
  }
  if (product.categorySlug === "smartwatches") {
    return {
      ...base,
      Conectividade: name.includes("gps + celular") || name.includes("celular") ? "GPS + Celular" : "GPS",
      "Resistência à Água": "WR50 / 50 metros",
      Bateria: "Até 18 horas",
      Compatibilidade: name.includes("apple") ? "iPhone (iOS 17+)" : "Android 6.0+",
    };
  }
  if (product.categorySlug === "cameras") {
    return {
      ...base,
      Tipo: name.includes("mirrorless") ? "Mirrorless" : name.includes("dslr") ? "DSLR" : "Câmera de Ação",
      Resolução: "24 MP (aprox.)",
      Vídeo: "4K 60fps",
      Conectividade: "Wi-Fi / Bluetooth",
    };
  }
  return base;
}

export function getProductDescription(product: Product): string {
  const catDescriptions: Record<string, string> = {
    smartphones: `O ${product.name} chega para redefinir o que é possível em um smartphone. Com design premium, câmera de alta resolução e processador de última geração, este dispositivo oferece desempenho excepcional para todas as suas necessidades. Seja para trabalho, entretenimento ou fotografia, você encontrará tudo que precisa em um único aparelho. Aproveite a conectividade de ponta, bateria de longa duração e o mais recente sistema operacional para uma experiência completa e sem limites.`,
    notebooks: `O ${product.name} é a combinação perfeita de desempenho, portabilidade e estilo. Equipado com processador de alta performance e memória generosa, este notebook foi desenvolvido para profissionais e estudantes que exigem o melhor. O display de alta resolução oferece cores vibrantes e detalhes nítidos, enquanto a bateria de longa duração garante produtividade o dia todo. Ideal para multitarefas, edição de vídeo, programação e muito mais.`,
    tablets: `O ${product.name} redefine a experiência em tablets com sua tela deslumbrante e processador poderoso. Perfeito para trabalho, estudo e entretenimento, este dispositivo oferece uma experiência imersiva e versátil. Com suporte a acessórios como teclado e caneta digital, transforma-se em uma poderosa ferramenta de produtividade. Leve e elegante, é o companheiro ideal para o dia a dia.`,
    smartwatches: `O ${product.name} é muito mais que um relógio — é um parceiro de saúde e conectividade no seu pulso. Monitore sua frequência cardíaca, nível de oxigênio no sangue, qualidade do sono e atividades físicas com precisão. Receba notificações, responda mensagens e controle sua música diretamente do pulso. Com design sofisticado e resistência à água, é o acessório perfeito para qualquer estilo de vida.`,
    audio: `O ${product.name} oferece uma experiência de áudio premium e imersiva. Com cancelamento de ruído ativo de alta qualidade, você se isola do mundo exterior e se concentra apenas na sua música. O som rico e equilibrado com graves profundos e agudos cristalinos proporciona uma experiência musical incomparável. Confortável para uso prolongado, com autonomia de bateria excepcional e conectividade sem fio estável.`,
    cameras: `O ${product.name} é a ferramenta ideal para fotógrafos e videomakers que buscam qualidade profissional. Com sensor de alta resolução, autofoco rápido e preciso, e capacidade de gravação em 4K, este equipamento captura cada momento com fidelidade e detalhamento impressionantes. Design robusto e ergonômico para uso em qualquer ambiente.`,
    games: `O ${product.name} eleva sua experiência de jogo a um novo patamar. Com hardware poderoso, biblioteca extensa de jogos e recursos exclusivos, este produto foi desenvolvido para proporcionar entretenimento imersivo e de alta qualidade. Prepare-se para gráficos deslumbrantes, jogabilidade fluida e experiências únicas que só os melhores equipamentos podem oferecer.`,
    acessorios: `O ${product.name} é o acessório perfeito para complementar e potencializar seu dispositivo. Com qualidade de construção premium e design cuidadosamente elaborado, este produto oferece funcionalidade e estilo em harmonia. Compatível com os principais dispositivos do mercado, é uma adição essencial para quem busca o melhor desempenho e experiência.`,
  };
  return catDescriptions[product.categorySlug] ?? `${product.name} — produto de qualidade premium com garantia e entrega rápida.`;
}
