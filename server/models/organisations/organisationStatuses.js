import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const OrganisationStatus = sequelize.define(
  "OrganisationStatuses",
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
    status: {
        type: DataTypes.ENUM('Active', 'In-Active'),
        allowNull: false,
        defaultValue: 'Active'
    }
  },
  {
    modelName: "OrganisationStatuses",
    timestamps: true,
  }
);
