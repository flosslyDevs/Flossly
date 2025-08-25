import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const RotaShift = sequelize.define(
  "RotaShifts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rotaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rota",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    label: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    breakTime: { type: DataTypes.INTEGER, allowNull: true },
    notes: { type: DataTypes.TEXT },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "RotaShifts", timestamps: true }
);
