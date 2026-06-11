"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Hook para buscar produtos do WooCommerce
 */
export function useProducts(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  category?: number;
  featured?: boolean;
  onSale?: boolean;
}) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.category) searchParams.set("category", params.category.toString());
  if (params?.featured !== undefined) searchParams.set("featured", params.featured.toString());
  if (params?.onSale !== undefined) searchParams.set("on_sale", params.onSale.toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/products?${searchParams.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    products: data?.products || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook para buscar categorias do WooCommerce
 */
export function useCategories() {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    categories: data?.categories || [],
    isLoading,
    isError: error,
  };
}

/**
 * Hook para buscar produtos em destaque
 */
export function useFeaturedProducts(limit = 10) {
  return useProducts({ featured: true, perPage: limit });
}

/**
 * Hook para buscar produtos em promoção
 */
export function useOnSaleProducts(limit = 10) {
  return useProducts({ onSale: true, perPage: limit });
}
