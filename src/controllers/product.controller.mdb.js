
// *** CAPA CONTROLLERS DEL MVC - Para el Manejo Productos  ***

// Importando el productServices
// Al importar el productServices nos traemos todo los metodos de la libreria mongoose 

import productServices from '../services/product.service.js'


export class ProductsController {
    
    constructor() {
        // Creo el constructor y lo dejo vacio
    }

    // METODO CREATE = Agregando un Producto a la BD
    async addProduct(product) {
        
        try {
            
            // Usando los productServices
            await productServices.createProduct(product)
            
            return "Producto agregado"

        } catch (err) {
            
            return err.message

        }
    }

    // METODO READ =  Leyendo el lista de productos y realizo una Paginacion de los mismos  
    async getProducts(limit, page, sort, description) {
        
        // 1er Parametro para que le Asigno al paginado 
        const criteria = {}
        if (description) {
            criteria.description = description
        }

        // 2do Parametro Filtros que van a condicionar mi paginacion 
        const pagination = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sort: { price: ['asc', 'desc'].includes(sort) ? sort : 'asc' },
            lean: true,
            select: ['_id', 'title', 'price', 'stock', 'description', 'thumbnail', 'code']
        }

        try {

            // Usando los productServices
            const products = await productServices.getProducts(criteria, pagination)
            return products

        } catch (err) {

            return err.message
        }

    }

    // METODO READ BY ID = Leyendo un(1) producto de la BD por su ID 
    async getProductById(id) {
        
        try {

            // uso el metodo .findById(id) que me proporciona mongoose
            const product = await productServices.getProductById(id)
            
            // Aca hacemos una validacion ternaria a modo de control dentro del return
            return product === null ? 'No se encuentra el producto' : product

        } catch (err) {
            return err.message
        }
    }

    // METODO UPDATE = actualizar un Producto por su ID en la BD
    // tiene 2 parametros: 
    // El 1er la paso ID del producto a actualizar
    // El 2do le paso el objeto con la informacion a actualizar
    async updateProduct(id, newContent) {

        try {

            // uso el metodo .findByIdAndUpdate() que me proporciona mongoose
            const procedure = await productServices.updateProduct(id, newContent)
            return procedure

        } catch (err) {

            return err.message
        }
    }

    // METODO DELETE = Borrar un producto de la BD
    async deleteProductById(id) {
        try {

            // uso el metodo .findByIdAndDelete() que me proporciona mongoose
            const procedure = await productServices.deleteProduct(id)
            return procedure

        } catch (err) {

            return err.message

        }
    }

    async checkProductStock(id, count) {
        try {
            const product = await productServices.getProductById(id)
            console.log(id, product.title, product.stock, count)
            return product.stock >= count
        } catch (err) {
            console.error(err)
            return false;
        }
    }

    async updateProductStock(id, cantidad) {
        try {
            const product = await productServices.getProductById(id)
            if (cantidad > product.stock) {
                throw Error("No hay suficiente stock")
            }
            const result = await productServices.updateProduct(id, { ...product, stock: product.stock - cantidad })
            return result
        } catch (err) {
            console.error(err)
            return null
        }
    }
  
}