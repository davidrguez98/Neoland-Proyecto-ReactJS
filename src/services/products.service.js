const API_URL_PRODUCTS = import.meta.env.VITE_API_URL_PRODUCTS
const API_URL_PURCHASES = import.meta.env.VITE_API_URL_PURCHASES

async function getProductsService() {
    try {
        const res = await fetch(API_URL_PRODUCTS, { method: 'GET' })
        if (!res.ok) { throw new Error(`Error: ${res.status}`) }
        
        const data = await res.json()

        return {
            success: true,
            data: data,
            error: null
        }
        
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error.message
        }
    }
}

async function updateProductService(id, product) {
    try {
        const formData = new FormData()
        Object.keys(product).forEach(key => formData.append(key, product[key]))

        const res = await fetch(`${API_URL_PRODUCTS}${id}`, {
            method: 'PUT',
            body: formData
        })

        if (!res.ok) { throw new Error(`Error: ${res.status}`) }

        const data = await res.json()

        return {
            success: true,
            data: data,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            error: error.message
        }
    }
}

async function newPurchase(purchaseData) {
    try {
        const formData = new FormData()
        Object.keys(purchaseData).forEach(key => formData.append(key, purchaseData[key]))
        formData.append('FORM', 'YO')

        const res = await fetch(API_URL_PURCHASES, {
            method: 'POST',
            body: formData
        })

        if (!res.ok) { throw new Error(`Error: ${res.status}`) }

        const data = await res.json()

        return {
            success: true,
            data: data,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            error: error.message
        }
    }
}

export { getProductsService, updateProductService, newPurchase }