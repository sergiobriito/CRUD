const crypto = require("crypto");
const connectDB = require("../config/db");
const db = connectDB();

const getUsers = (req, res) => {
  const sqlGet = "SELECT * FROM usuario";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
};

const getUserID = (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM usuario WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
};

const setUser = (req, res) => {
  const { nome, email, telefone, senha } = req.body;
  const senhaCrypto = crypto.createHash("md5").update(senha).digest("hex");
  const sqlInsert =
    "INSERT INTO usuario (nome,email,telefone,senha) VALUES (?,?,?,?)";
  db.query(sqlInsert, [nome, email, telefone, senhaCrypto], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, senha } = req.body;
  const senhaCrypto = crypto.createHash("md5").update(senha).digest("hex");
  const sqlUpdate =
    "UPDATE usuario SET nome= ?, email= ?, telefone= ?, senha= ? WHERE id= ?";
  db.query(
    sqlUpdate,
    [nome, email, telefone, senhaCrypto, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM usuario WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = {
  getUsers,
  getUserID,
  setUser,
  updateUser,
  deleteUser,
};
