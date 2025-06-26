const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Relasi: 1 user punya banyak note
User.hasMany(Note);
Note.belongsTo(User);

module.exports = Note;
