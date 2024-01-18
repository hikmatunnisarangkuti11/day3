import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

  Product.associate = function (models) {
  Product.hasMany(models.Transaction, {
    foreignKey: 'product_id', // Name of the foreign key in the Transaction model
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default Product;

(async()=>{
    await db.sync();
})();