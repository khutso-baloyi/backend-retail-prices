const db = require("../config/db");
const Auth = require("./auth");
class User {
  //get all users.
  async getUsers() {
    let results = await db.query(`SELECT * FROM "User"`).catch(console.log);
    return results.rows;
  }

  //create a user.
  async createUser(user) {
      console.log("the user", user)
    let response = await db
      .query("INSERT INTO \"User\" (username, password) VALUES ($1, $2)", [user.username,user.password,])
      .catch(console.log);


      let user_id = await new Auth().findUsername(user.username);
      

      await db.query(`INSERT INTO "User_Store" (user_id, store_id, is_primary_store) VALUES ($1, $2, $3)`, [ user_id[0].user_id, user.store_id, true ])
    return response.rows;
  }

  //update a todo.
  async updateUser(userid, user) {
    //check if user exist.
    let original_user = await db
      .query(`SELECT * FROM "User" WHERE user_id=$1`, [parseInt(userid)])
      .catch(console.log);
    // let new_checked_value = !original_todo.rows[0].checked;
    console.log("original user", original_user.rows)
    
    let response = await db
      .query(`UPDATE "User" SET username=$1, password=$2 WHERE user_id=$3`, [user.username, user.password, userid])
      .catch(console.log);
    return response;
  }

  //delete a todo.
  async deleteUser(userId) {
    let response = await db.query(`DELETE FROM "User" WHERE user_id=$1`, [parseInt(userId)]).catch(console.log);
    return response;
  }
}

module.exports = User;