function tryCatchError(error, action) {
    console.error(`Error al ${action} el producto: ${error}`)
    alert(`Error al ${action} el producto.`)
}

function serviceError(data, error) {
    return {
        success: false,
        data: data,
        error: error.message
    }
}

function contextError

export { tryCatchError, serviceError, contextError }