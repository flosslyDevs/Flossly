import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserLoyaltyPoint = sequelize.define(
  "UserLoyaltyPoints",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    loyaltyPointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LoyaltyPoints",
        key: "id",
      },
    },
    status: {
        type: DataTypes.ENUM("Pending", "Processing","Completed"),
        defaultValue: 'Pending',
        allowNull: false
    },
    deliveryDetails: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  },
  {
    modelName: "UserLoyaltyPoints",
    timestamps: true,
  }
);
