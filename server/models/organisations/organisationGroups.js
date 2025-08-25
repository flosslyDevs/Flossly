import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const OrganisationGroup = sequelize.define(
  "OrganisationGroups",
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
    description: {
        type: DataTypes.STRING(200),
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
  },
  {
    modelName: "OrganisationGroups",
    timestamps: true,
  }
);
