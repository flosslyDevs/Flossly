import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";
import { DefaultPriority } from "../defaultPriorities";
import { OrganisationPriority } from "./organisationPriorities";
import { DefaultStatus } from "../defaultStatuses";
import { OrganisationStatus } from "./organisationStatuses";

export const Organisation = sequelize.define(
  "Organisations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    surgeryCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    teamCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    currentApp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        "Dental",
        "General Practice",
        "Dermatology",
        "Physiotherapy"
      ),
      allowNull: true,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key:  'id'
      }
    },
    logo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cqcInspectionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    referedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("Invited", "Active", "InActive"),
      allowNull: true,
    }
  },
  {
    modelName: "Organisations",
    timestamps: true,
    hooks: {
      async afterCreate(organisation, options) {
        const transaction = options.transaction;
        try {
          // Seed default priorities
          const defaultPriorities = await DefaultPriority.findAll();
          const priorityData = defaultPriorities.map((p) => ({
            key: p.key,
            name: p.name,
            color: p.color,
            sortOrder: p.sortOrder,
            organisationId: organisation.id,
            status: "Active",
          }));
          await OrganisationPriority.bulkCreate(priorityData, { transaction });
          // Seed default statuses
          const defaultStatuses = await DefaultStatus.findAll();
          const statusData = defaultStatuses.map((s) => ({
            key: s.key,
            name: s.name,
            color: s.color,
            description: s.description,
            organisationId: organisation.id,
            status: "Active",
          }));
          await OrganisationStatus.bulkCreate(statusData, { transaction });
        } catch (err) {
          console.error("Error seeding priorities/statuses:", err);
          throw err;
        }
      },
    },
  }
);
