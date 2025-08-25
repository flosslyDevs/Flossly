import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserTaskChecklist = sequelize.define(
  "UserTaskChecklists",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userTaskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserTasks",
        key: "id",
      },
    },
    question: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fieldOneTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fieldOneValue: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fieldTwoTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fieldTwoValue: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    showRadio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    showTime: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    showDate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    radioValue: {
      type: DataTypes.ENUM("Yes", "No", "N/A"),
      defaultValue: "N/A",
      allowNull: false,
    },
    timeValue: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    dateValue: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    modelName: "UserTaskChecklists",
    timestamps: true,
  }
);
