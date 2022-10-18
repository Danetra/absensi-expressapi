const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const client = require("../../postgree");
const uuid = require("uuid");

const signUp = async (req, res) => {
  const id = "unm" + uuid.v1().substring(0, 5);
  const nama = req.body.nama;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  console.log(password);

  client.query(
    `INSERT INTO users(id,nama,email,password) values ('${id}', '${nama}', '${email}', '${password}')`,
    (err) => {
      if (!err) {
        console.log("Insert Success");
        res.send({ message: "Insert Success", status: 200 });
      } else {
        console.log(err.message);
        res.send(err.message);
      }
    }
  );
};

const loginUsers = async (req, insert = true) => {
  const user = await checkUsers(req.body.email);
  //   console.log(user);
  let accessToken;
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(checkPassword);
  console.log(req.body.password);
  console.log(user.password);
  if (await bcrypt.compare(req.body.password, user.password)) {
    accessToken = generateTokenJWT(user, insert);
    return accessToken;
  } else {
    return response.json({ success: false, message: "passwords do not match" });
  }
};

const checkUsers = async (email) => {
  var result = await client.query(`SELECT * FROM users where email = $1`, [
    email,
  ]);
  //   console.log(result.rows);
  return result.rows[0];
};

const generateTokenJWT = (user, insert, time = 60 * 60) => {
  var jwt_key = "";
  if (insert) {
    jwt_key = "63ro7fvsphnsn5979ktt3e2ll3sa6por";
  } else {
    jwt_key = "ajwdlkwajdjkajdawdsk23ad";
  }
  return jwt.sign(
    {
      id: user.id,
      nama: user.nama,
    },
    jwt_key,
    {
      expiresIn: time,
    }
  );
};

module.exports = { checkUsers, generateTokenJWT, signUp, loginUsers };
