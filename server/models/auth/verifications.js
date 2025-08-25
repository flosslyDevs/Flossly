import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const Verification = sequelize.define(
  "Verifications",
  {
    email: { type: DataTypes.STRING, allowNull: false },
    otp: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    modelName: "Verifications",
    timestamps: true,
    updatedAt: true,
  }
);
