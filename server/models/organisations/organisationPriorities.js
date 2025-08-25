import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const OrganisationPriority = sequelize.define(
  "OrganisationPriorities",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organisations",
        key: "id"
      }
    },
    status: {
        type: DataTypes.ENUM('Active', 'In-Active'),
        allowNull: false,
        defaultValue: 'Active'
    }
  },
  {
    modelName: "OrganisationPriorities",
    timestamps: true,
  }
);
