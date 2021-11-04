const db = require("../config/db");
const Auth = require("./auth");

class Store {
    
    async getStores() {
        
        let results = await db.query(`SELECT * FROM "Store"`).catch(console.log);
        return results.rows;
      }

    async getUsersStores(user_id) {

        let results = await db.query(`SELECT store_id from "User_Store" WHERE user_id=$1`, [user_id,]).catch(console.log);
        return results.rows;
    }

    async addStore(user_id, store_id) {
        
        let results = await db.query(`INSERT INTO "User_Store" (user_id, store_id, is_primary_store) VALUES ($1, $2, $3)`, [user_id, store_id, false]);
        return results.rows;
    }
    
}

module.exports = Store;

