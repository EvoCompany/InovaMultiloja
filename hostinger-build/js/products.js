/**
 * INOVA MULTILOJA - Products Data
 * 
 * Este arquivo contém os produtos de demonstração.
 * Quando você configurar o WooCommerce, os produtos serão
 * carregados automaticamente da API do WordPress.
 */

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=555596859071";

// Produtos de demonstração
const demoProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB Titânio Natural",
        price: 8499.00,
        originalPrice: 9999.00,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
        badge: "Novo",
        category: "smartphones"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra 512GB",
        price: 7299.00,
        originalPrice: 8499.00,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        badge: "-14%",
        category: "smartphones"
    },
    {
        id: 3,
        name: "MacBook Air M3 15\" 256GB",
        price: 12999.00,
        originalPrice: 14999.00,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        badge: "Novo",
        category: "notebooks"
    },
    {
        id: 4,
        name: "Apple Watch Series 9 GPS 45mm",
        price: 3799.00,
        originalPrice: 4299.00,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        badge: "-12%",
        category: "smartwatches"
    },
    {
        id: 5,
        name: "AirPods Pro 2ª Geração USB-C",
        price: 1899.00,
        originalPrice: 2299.00,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
        badge: "-17%",
        category: "audio"
    },
    {
        id: 6,
        name: "iPad Pro M2 11\" 128GB Wi-Fi",
        price: 7499.00,
        originalPrice: 8999.00,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        badge: "-17%",
        category: "tablets"
    },
    {
        id: 7,
        name: "PlayStation 5 Slim Digital Edition",
        price: 3499.00,
        originalPrice: 3999.00,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
        badge: "-13%",
        category: "games"
    },
    {
        id: 8,
        name: "Sony WH-1000XM5 Headphone Bluetooth",
        price: 2299.00,
        originalPrice: 2799.00,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
        badge: "-18%",
        category: "audio"
    },
    {
        id: 9,
        name: "Xiaomi Redmi Note 13 Pro 256GB",
        price: 1899.00,
        originalPrice: 2299.00,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        badge: "-17%",
        category: "smartphones"
    },
    {
        id: 10,
        name: "Canon EOS R50 Kit 18-45mm",
        price: 5499.00,
        originalPrice: 6299.00,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
        badge: "-13%",
        category: "cameras"
    }
];

// Ofertas especiais
const offerProducts = [
    {
        id: 11,
        name: "Motorola Edge 40 Pro 256GB",
        price: 2999.00,
        originalPrice: 4999.00,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
        badge: "-40%",
        category: "smartphones"
    },
    {
        id: 12,
        name: "JBL Flip 6 Caixa de Som Bluetooth",
        price: 599.00,
        originalPrice: 899.00,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        badge: "-33%",
        category: "audio"
    },
    {
        id: 13,
        name: "Samsung Galaxy Tab S9 128GB",
        price: 4299.00,
        originalPrice: 5999.00,
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
        badge: "-28%",
        category: "tablets"
    },
    {
        id: 14,
        name: "Logitech MX Master 3S Mouse",
        price: 499.00,
        originalPrice: 799.00,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        badge: "-38%",
        category: "acessorios"
    },
    {
        id: 15,
        name: "Nintendo Switch OLED 64GB",
        price: 2199.00,
        originalPrice: 2699.00,
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
        badge: "-19%",
        category: "games"
    }
];

/**
 * Formata preço para Real brasileiro
 */
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

/**
 * Calcula preço com desconto Pix (7%)
 */
function calculatePixPrice(price) {
    return price * 0.93;
}

/**
 * Calcula parcelas
 */
function calculateInstallment(price, installments = 12) {
    return price / installments;
}

/**
 * Cria HTML do card do produto
 */
function createProductCard(product) {
    const pixPrice = calculatePixPrice(product.price);
    const installment = calculateInstallment(product.price);
    const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} - ${formatPrice(product.price)}`);
    
    return `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge ${product.badge === 'Novo' ? 'new' : ''}">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${product.originalPrice ? `<p class="product-price-old">${formatPrice(product.originalPrice)}</p>` : ''}
                <p class="product-price-pix">${formatPrice(pixPrice)} no Pix</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-installment">ou 12x de ${formatPrice(installment)} sem juros</p>
                <a href="${WHATSAPP_LINK}&text=${whatsappMessage}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Comprar via WhatsApp
                </a>
            </div>
        </article>
    `;
}

/**
 * Renderiza produtos na página
 */
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const offersGrid = document.getElementById('offersGrid');
    
    if (productsGrid) {
        productsGrid.innerHTML = demoProducts.map(createProductCard).join('');
    }
    
    if (offersGrid) {
        offersGrid.innerHTML = offerProducts.map(createProductCard).join('');
    }
}

// Renderiza produtos quando a página carregar
document.addEventListener('DOMContentLoaded', renderProducts);
