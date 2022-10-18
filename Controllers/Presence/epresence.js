const express = require("express");
const client = require("../../postgree");

const postPresence = async (req, res) => {
  console.log(req.body);
  //   client.query();
};

module.exports = { postPresence };
