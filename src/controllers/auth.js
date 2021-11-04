const db = require("../config/db");

class Auth {
    //find if username exists
    async findUsername(username) {
        
        let results = await db.query(`SELECT * FROM "User" WHERE username=$1`, [username,]).catch(console.log);
        return results.rows;
      }
    
}

module.exports = Auth;