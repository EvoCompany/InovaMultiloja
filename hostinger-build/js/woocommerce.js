/**
 * INOVA MULTILOJA - WooCommerce Integration
 * 
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 * 
 * 1. Instale o WordPress com WooCommerce na sua hospedagem
 * 2. No WooCommerce, vá em Configurações > Avançado > REST API
 * 3. Crie uma nova chave de API com permissão de "Leitura"
 * 4. Copie a Consumer Key e Consumer Secret
 * 5. Configure as variáveis abaixo com suas credenciais
 * 6. Substitua a chamada de renderProducts() no products.js
 *    por renderWooCommerceProducts()
 */

// ========================================
// CONFIGURAÇÃO - ALTERE ESTAS VARIÁVEIS
// ========================================

const WOOCOMMERCE_CONFIG = {
    // URL base do seu WordPress (sem barra no final)
    siteUrl: 'https://seu-site.com.br',
    
    // Chaves da API (obtenha em WooCommerce > Configurações > Avançado > REST API)
    consumerKey: 'ck_sua_consumer_key_aqui',
    consumerSecret: 'cs_sua_consumer_secret_aqui',
    
    // Configurações de exibição
    productsPerPage: 10,
    offersPerPage: 5
};

// ========================================
// FUNÇÕES DE API
// ========================================

/**
 * Constrói a URL da API do WooCommerce
 */
function buildApiUrl(endpoint, params = {}) {
    const url = new URL(`${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/${endpoint}`);
    url.searchParams.append('consumer_key', WOOCOMMERCE_CONFIG.consumerKey);
    url.searchParams.append('consumer_secret', WOOCOMMERCE_CONFIG.consumerSecret);
    
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    
    return url.toString();
}

/**
 * Busca produtos da API do WooCommerce
 */
async function fetchWooCommerceProducts(params = {}) {
    try {
        const url = buildApiUrl('products', {
            per_page: WOOCOMMERCE_CONFIG.productsPerPage,
            status: 'publish',
            ...params
        });
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

/**
 * Busca categorias da API do WooCommerce
 */
async function fetchWooCommerceCategories() {
    try {
        const url = buildApiUrl('products/categories', {
            per_page: 20,
            hide_empty: true
        });
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return [];
    }
}

/**
 * Converte produto do WooCommerce para formato do site
 */
function convertWooProduct(wooProduct) {
    const regularPrice = parseFloat(wooProduct.regular_price) || 0;
    const salePrice = parseFloat(wooProduct.sale_price) || regularPrice;
    const onSale = wooProduct.on_sale && regularPrice > salePrice;
    
    let badge = '';
    if (onSale && regularPrice > 0) {
        const discount = Math.round((1 - salePrice / regularPrice) * 100);
        badge = `-${discount}%`;
    } else if (isNewProduct(wooProduct.date_created)) {
        badge = 'Novo';
    }
    
    return {
        id: wooProduct.id,
        name: wooProduct.name,
        price: salePrice || regularPrice,
        originalPrice: onSale ? regularPrice : null,
        image: wooProduct.images[0]?.src || 'assets/placeholder.jpg',
        badge: badge,
        category: wooProduct.categories[0]?.slug || ''
    };
}

/**
 * Verifica se o produto é novo (menos de 30 dias)
 */
function isNewProduct(dateCreated) {
    const created = new Date(dateCreated);
    const now = new Date();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays < 30;
}

// ========================================
// FUNÇÕES DE RENDERIZAÇÃO
// ========================================

/**
 * Renderiza produtos do WooCommerce
 */
async function renderWooCommerceProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const offersGrid = document.getElementById('offersGrid');
    
    // Mostra loading
    if (productsGrid) {
        productsGrid.innerHTML = createLoadingSkeletons(WOOCOMMERCE_CONFIG.productsPerPage);
    }
    if (offersGrid) {
        offersGrid.innerHTML = createLoadingSkeletons(WOOCOMMERCE_CONFIG.offersPerPage);
    }
    
    try {
        // Busca produtos em destaque
        const featuredProducts = await fetchWooCommerceProducts({
            featured: true,
            per_page: WOOCOMMERCE_CONFIG.productsPerPage
        });
        
        // Busca produtos em promoção
        const saleProducts = await fetchWooCommerceProducts({
            on_sale: true,
            per_page: WOOCOMMERCE_CONFIG.offersPerPage
        });
        
        // Renderiza produtos em destaque
        if (productsGrid) {
            if (featuredProducts.length > 0) {
                productsGrid.innerHTML = featuredProducts
                    .map(convertWooProduct)
                    .map(window.createProductCard)
                    .join('');
            } else {
                // Se não houver produtos em destaque, busca todos
                const allProducts = await fetchWooCommerceProducts();
                productsGrid.innerHTML = allProducts
                    .map(convertWooProduct)
                    .map(window.createProductCard)
                    .join('');
            }
        }
        
        // Renderiza ofertas
        if (offersGrid) {
            if (saleProducts.length > 0) {
                offersGrid.innerHTML = saleProducts
                    .map(convertWooProduct)
                    .map(window.createProductCard)
                    .join('');
            } else {
                offersGrid.innerHTML = '<p style="text-align:center;color:#666;">Nenhuma oferta disponível no momento.</p>';
            }
        }
        
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        
        // Fallback para produtos de demonstração
        if (typeof window.renderProducts === 'function') {
            window.renderProducts();
        }
    }
}

/**
 * Cria skeletons de loading
 */
function createLoadingSkeletons(count) {
    return Array(count).fill('<div class="product-card skeleton"></div>').join('');
}

/**
 * Busca produtos por categoria
 */
async function searchProductsByCategory(categorySlug) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
        productsGrid.innerHTML = createLoadingSkeletons(WOOCOMMERCE_CONFIG.productsPerPage);
        
        const products = await fetchWooCommerceProducts({
            category: categorySlug
        });
        
        if (products.length > 0) {
            productsGrid.innerHTML = products
                .map(convertWooProduct)
                .map(window.createProductCard)
                .join('');
        } else {
            productsGrid.innerHTML = '<p style="text-align:center;color:#666;">Nenhum produto encontrado nesta categoria.</p>';
        }
    }
}

/**
 * Busca produtos por termo
 */
async function searchProducts(searchTerm) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
        productsGrid.innerHTML = createLoadingSkeletons(WOOCOMMERCE_CONFIG.productsPerPage);
        
        const products = await fetchWooCommerceProducts({
            search: searchTerm
        });
        
        if (products.length > 0) {
            productsGrid.innerHTML = products
                .map(convertWooProduct)
                .map(window.createProductCard)
                .join('');
                
            // Scroll para produtos
            document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            productsGrid.innerHTML = `<p style="text-align:center;color:#666;">Nenhum produto encontrado para "${searchTerm}".</p>`;
        }
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a integração com WooCommerce
 * 
 * Para ativar, descomente a linha abaixo e comente
 * a chamada de renderProducts() no products.js
 */
// document.addEventListener('DOMContentLoaded', renderWooCommerceProducts);

// Exporta funções para uso global
window.WooCommerce = {
    fetchProducts: fetchWooCommerceProducts,
    fetchCategories: fetchWooCommerceCategories,
    renderProducts: renderWooCommerceProducts,
    searchByCategory: searchProductsByCategory,
    searchProducts: searchProducts
};

// Declare createProductCard function
function createProductCard(product) {
    // Implementation of createProductCard
    return `<div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            </div>`;
}

// Declare renderProducts function
function renderProducts() {
    // Implementation of renderProducts
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = '<p style="text-align:center;color:#666;">Produtos de demonstração.</p>';
    }
}
