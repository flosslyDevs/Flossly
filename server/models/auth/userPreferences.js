import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserPreference = sequelize.define(
  "UserPreferences",
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
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastLoginOrganisationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Organisations",
        key: "id",
      },
    },
    licenseType: {
      type: DataTypes.ENUM("System", "Trial", "Monthly", "Yearly"),
      allowNull: false,
    },
    licenseRenewalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    taskTableColumns: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    modelName: "UserPreferences",
    timestamps: true,
  }
);
