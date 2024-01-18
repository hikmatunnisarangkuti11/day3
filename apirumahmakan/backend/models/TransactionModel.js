import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;


const Transaction = db.define(
    "transactions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Product, {
      foreignKey: 'product_id', // Name of the foreign key in the Transaction model
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

export default Transaction;

(async()=>{
    await db.sync();
})();
  
  