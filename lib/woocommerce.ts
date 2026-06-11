/**
 * WooCommerce REST API Integration
 * 
 * Este módulo fornece funções para conectar com a API REST do WooCommerce.
 * Para usar, configure as variáveis de ambiente no seu projeto.
 * 
 * Variáveis necessárias:
 * - WOOCOMMERCE_URL: URL do seu site WordPress (ex: https://seusite.com.br)
 * - WOOCOMMERCE_CONSUMER_KEY: Chave do consumidor da API WooCommerce
 * - WOOCOMMERCE_CONSUMER_SECRET: Chave secreta do consumidor da API WooCommerce
 */

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  images: {
    id: number;
    date_created: string;
    date_modified: string;
    src: string;
    name: string;
    alt: string;
  }[];
  attributes: {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }[];
  default_attributes: {
    id: number;
    name: string;
    option: string;
  }[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  meta_data: {
    id: number;
    key: string;
    value: string;
  }[];
  date_created: string;
  date_modified: string;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: {
    id: number;
    src: string;
    name: string;
    alt: string;
  } | null;
  menu_order: number;
  count: number;
}

interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
}

function getConfig(): WooCommerceConfig {
  const url = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      "WooCommerce não está configurado. Configure as variáveis de ambiente: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET"
    );
  }

  return { url, consumerKey, consumerSecret };
}

function getAuthHeader(consumerKey: string, consumerSecret: string): string {
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  return `Basic ${credentials}`;
}

/**
 * Buscar produtos do WooCommerce
 */
export async function getProducts(params?: {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  featured?: boolean;
  on_sale?: boolean;
  orderby?: "date" | "id" | "include" | "title" | "slug" | "price" | "popularity" | "rating";
  order?: "asc" | "desc";
}): Promise<WooCommerceProduct[]> {
  const config = getConfig();
  
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.per_page) searchParams.set("per_page", params.per_page.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.category) searchParams.set("category", params.category.toString());
  if (params?.featured !== undefined) searchParams.set("featured", params.featured.toString());
  if (params?.on_sale !== undefined) searchParams.set("on_sale", params.on_sale.toString());
  if (params?.orderby) searchParams.set("orderby", params.orderby);
  if (params?.order) searchParams.set("order", params.order);

  const response = await fetch(
    `${config.url}/wp-json/wc/v3/products?${searchParams.toString()}`,
    {
      headers: {
        Authorization: getAuthHeader(config.consumerKey, config.consumerSecret),
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache por 60 segundos
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Buscar um produto específico pelo ID
 */
export async function getProductById(id: number): Promise<WooCommerceProduct> {
  const config = getConfig();

  const response = await fetch(
    `${config.url}/wp-json/wc/v3/products/${id}`,
    {
      headers: {
        Authorization: getAuthHeader(config.consumerKey, config.consumerSecret),
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar produto: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Buscar categorias do WooCommerce
 */
export async function getCategories(params?: {
  page?: number;
  per_page?: number;
  parent?: number;
  hide_empty?: boolean;
}): Promise<WooCommerceCategory[]> {
  const config = getConfig();
  
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.per_page) searchParams.set("per_page", params.per_page.toString());
  if (params?.parent !== undefined) searchParams.set("parent", params.parent.toString());
  if (params?.hide_empty !== undefined) searchParams.set("hide_empty", params.hide_empty.toString());

  const response = await fetch(
    `${config.url}/wp-json/wc/v3/products/categories?${searchParams.toString()}`,
    {
      headers: {
        Authorization: getAuthHeader(config.consumerKey, config.consumerSecret),
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache por 5 minutos
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar categorias: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Buscar produtos em destaque
 */
export async function getFeaturedProducts(limit = 10): Promise<WooCommerceProduct[]> {
  return getProducts({ featured: true, per_page: limit });
}

/**
 * Buscar produtos em promoção
 */
export async function getOnSaleProducts(limit = 10): Promise<WooCommerceProduct[]> {
  return getProducts({ on_sale: true, per_page: limit });
}

/**
 * Buscar produtos por categoria
 */
export async function getProductsByCategory(
  categoryId: number,
  limit = 10
): Promise<WooCommerceProduct[]> {
  return getProducts({ category: categoryId, per_page: limit });
}

/**
 * Converte um produto WooCommerce para o formato usado no site
 */
export function convertToSiteProduct(wooProduct: WooCommerceProduct) {
  const price = parseFloat(wooProduct.price) || 0;
  const regularPrice = parseFloat(wooProduct.regular_price) || price;
  const salePrice = parseFloat(wooProduct.sale_price) || null;
  
  const discount = salePrice && regularPrice > salePrice 
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
    : undefined;

  return {
    id: wooProduct.id,
    name: wooProduct.name,
    price: price,
    originalPrice: wooProduct.on_sale ? regularPrice : undefined,
    image: wooProduct.images[0]?.src || "/placeholder.svg",
    category: wooProduct.categories[0]?.name || "Sem categoria",
    isNew: isProductNew(wooProduct.date_created),
    isFeatured: wooProduct.featured,
    discount: discount,
  };
}

/**
 * Verifica se o produto é novo (criado nos últimos 30 dias)
 */
function isProductNew(dateCreated: string): boolean {
  const productDate = new Date(dateCreated);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return productDate > thirtyDaysAgo;
}

/**
 * Verifica se o WooCommerce está configurado
 */
export function isWooCommerceConfigured(): boolean {
  return !!(
    process.env.WOOCOMMERCE_URL &&
    process.env.WOOCOMMERCE_CONSUMER_KEY &&
    process.env.WOOCOMMERCE_CONSUMER_SECRET
  );
}
