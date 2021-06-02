const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  });