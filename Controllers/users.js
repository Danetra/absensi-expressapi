const express = require("express");
const client = require("./../postgree");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUsers = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // const user = checkEmail(email);
    const user = await client.query(
      `SELECT * from users where email = $1 and password = $2`,
      [email, password]
    );
    // console.log(user.rows[0].password);
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Email or Password is Incorrect", code: 401 });
    }
    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    throw error;
  }
};

const getUsers = async (req, res) => {
  client.query(`SELECT * FROM users order by id ASC`, (err, result) => {
    if (!err) {
      console.log(result.rows);
      res.send({ status: 200, data: result.rows });
    } else {
      console.log(err);
    }
  });
  //   let response = Axios.get();
};

const postUsers = async (req, res) => {
  console.log(req.body);
  const { id, nama, email, npp, npp_supervisor, password } = req.body;
  client.query(
    `INSERT INTO users(id, nama,email,npp,npp_supervisor,password) values('${id}', '${nama}', '${email}', '${npp}', '${npp_supervisor}', '${password}')`,
    (err) => {
      if (!err) {
        console.log("Insert Success");
        res.send({ message: "Insert Success", status: 200 });
      } else {
        res.send(err.message);
      }
    }
  );
};

const updateUsers = (req, res) => {
  console.log(req.body);
  const { nama, email, npp, npp_supervisor, password, id } = req.body;
  client.query(
    "UPDATE users SET nama = $1, email = $2, npp = $3, npp_supervisor = $4, password = $5 where id = $6",
    [nama, email, npp, npp_supervisor, password, id],
    (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Update Success");
        res.send({ status: true, message: `${nama} updated`, code: 200 });
      }
    }
  );
};

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  client.query("DELETE FROM users WHERE id = $1", [id], (err) => {
    if (err) {
      console.log({ message: err.message });
    } else {
      console.log("Delete Success");
      res.send({ status: true, message: "Delete Success", code: 200 });
    }
  });
};

// const checkEmail = async (email) => {
//   await client.query(`SELECT * from users where email = $1`, [email]);
// };
const checkPassword = async (password) => {
  await client.query(`SELECT * from users where password = $1`, [password]);
};

module.exports = { loginUsers, getUsers, postUsers, updateUsers, deleteUsers };
