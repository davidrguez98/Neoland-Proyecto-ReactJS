import { createContext, useState, useEffect } from 'react'

import { getProductsService, updateProductService, newPurchase, createProduct } from '../services/products.service.js'
import { productsMock } from '../assets/mocks/product.mock.js'

const ProductsContext = createContext()

function ProductsProvider(props) {
    const [ productsBBDD, setProductosBBDD ] = useState([])

    useEffect(() => {
        getProducts()
    }, [])
    
    async function getProducts() {
        const { success, data, error } = await getProductsService()

        if (success && Array.isArray(data) && data.length >= 0) {
            setProductosBBDD(data)
        } else {
            setProductosBBDD(productsMock)
            console.log(`Error ${error}`)
        }
    }

    async function newProduct(newProductData) {
        const { success, data, error } = await createProduct(newProductData)

        if (success) {
            console.log(`Producto creado correctamente: ${data}`)
            await getProducts()
        } else {
            setProductosBBDD(prev => [...prev, { _id: Date.now(), ...newProductData }])
            console.log(`Error en la API: ${error}`)
            throw new Error(error)
        }
    }

    async function addNewProduct(newProductData) {
        return await newProduct(newProductData)
    }

    async function editProduct(id, newData) {
        const { success, data, error } = await updateProductService(id, newData)
        
        if (success) {
            setProductosBBDD(prod => prod.map(product => product._id === id ? { ...product, ...newData } : product ))
            console.log('Producto actualizado')
        } else {
            setProductosBBDD(prod => prod.map(product => {
                if (product._id === id) {
                    return {
                        ...product,
                        ...newData
                    }
                }
                return product
            }))
            console.log('Error en API:', error)
        }
    }

    async function deleteProduct(id) {
        const success = 0
        const data = {}
        const error = 'Error API'

        if (success) {
            console.log(`Producto eliminado: ${data}`)
        } else {
            setProductosBBDD(prod => prod.filter(product => product._id !== id))
            console.log('Error en API:', error)
        }
    }
    async function addNewPurchase(newProduct) {
        const purchaseData = {
            productName: newProduct.name,
            developer: 'davidrguez98',
            applicationSource: 'ReactJS'
        }
        const { success, data, error } = await newPurchase(purchaseData)

        if (success) {
            console.log(`Venta enviada: ${data}`)
        } else {
            console.log('Error en API:', error)
        }
    }

    return (
        <ProductsContext.Provider value={{
            productsBBDD,
            newProduct,
            addNewProduct,
            editProduct,
            deleteProduct,
            getProducts,
            addNewPurchase
        }}>
            {props.children}
        </ProductsContext.Provider>
    )
}

export { ProductsContext, ProductsProvider }