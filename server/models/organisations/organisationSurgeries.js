import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const OrganisationSurgery = sequelize.define(
  "OrganisationSurgeries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organisations",
        key: "id"
      }
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
  },
  {
    modelName: "OrganisationSurgeries",
    timestamps: true,
  }
);
