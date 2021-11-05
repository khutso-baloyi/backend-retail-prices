const db = require("../config/db");
const Auth = require("./auth");

class Product {
    
    async getProducts() {
        
        let results = await db.query(`SELECT * FROM "Product"`).catch(console.log);
        return results.rows;
      }

    async getStoreProducts(store_id) {

        let results = await db.query(`SELECT * from "Store_Product" WHERE store_id=$1`, [store_id,]).catch(console.log);
        return results.rows;
    }

    async addProduct(product) {
        
        let added_product = await db.query(`INSERT INTO "Product" (barcode, name, description) VALUES ($1, $2, $3)`, [product.barcode, product.name, product.description]).catch(console.log);
        let results = await db.query(`INSERT INTO "Store_Product" (store_id, barcode, price) VALUES ($1, $2, $3)`, [product.store_id, product.barcode, product.price]).catch(console.log);
        
        return results.rows;
    }

    async addStoreProduct(product) {
        let results = await db.query(`INSERT INTO "Store_Product" (store_id, barcode, price) VALUES ($1, $2, $3)`, [product.store_id, product.barcode, product.price]).catch(console.log);
        
        return results.rows;
    }
    
    async findProduct(barcode) {
        
        console.log("the barcode", barcode)
        let product = await db.query(`SELECT * from "Product" WHERE barcode=$1`, [barcode,]).catch(console.log);

        return product.rows;
    }

    async findStoreProduct(store_id, barcode) {
        let storeProduct = await db.query(`SELECT * from "Store_Product" WHERE store_id=$1 AND barcode=$2`, [store_id, barcode]).catch(console.log);

        return storeProduct.rows;
    }

    async updateProductPrice({store_id, barcode, price}) {
        let prev_product = await this.findStoreProduct(store_id, barcode);
        console.log("prev_price", prev_product[0].price)
        console.log("the current price", price);
        let storeProduct = await db.query(`UPDATE "Store_Product" SET price=$1, prev_price=$2 WHERE store_id=$3 AND barcode=$4`, [price, prev_product[0].price, store_id, barcode]).catch(console.log);

        return storeProduct.rows;
    }
}

module.exports = Product;

