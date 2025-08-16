import { createContext, useState, useEffect } from 'react'

import { getProductsService, updateProductService, newPurchase } from '../services/products.service.js'
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

    async function newProduct(newProduct) {
        const success = 0
        const data = {}
        const error = 'Error API'

        if (success) {
            console.log(`Producto creado correctamente: ${data}`)
        } else {
            setProductosBBDD([...productsBBDD, { _id: Date.now(), ...newProduct }])
            console.log('Error en API:', error)
        }
    }

    async function editProduct(id, newData) {
        const { success, data, error } = await updateProductService(id, newData)
        
        if (success) {
            setProductosBBDD(prod => prod.map(product => product._id === id ? data : product))
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
        const { _id, ...productWithoutID } = newProduct
        const { success, data, error } = await newPurchase(productWithoutID)

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