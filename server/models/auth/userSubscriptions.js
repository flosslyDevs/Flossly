import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserSubscription = sequelize.define(
  "UserSubscriptions",
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
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Organisations",
        key: "id",
      },
    },
    stripeCustomerId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stripeSubscriptionId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stripeSubscriptionStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    packagePriceId: {
        type: DataTypes.STRING,
        allowNull: true
    }
  },
  {
    modelName: "UserSubscriptions",
    timestamps: true,
  }
);