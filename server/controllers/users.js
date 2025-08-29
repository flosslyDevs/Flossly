import {
  Organisation,
  Role,
  User,
  UserAccount,
  UserContract,
  UserOrganisation,
  UserPreference,
} from "../models";

export const usersList = async (event) => {
  const loggedUser = event.context.user;
  const currentOrg = loggedUser.orgId;
  const body = await readBody(event);
  const { roleId } = JSON.parse(body);
  const where = {};
  if (roleId) {
    where.roleId = roleId;
  }
  try {
    const userOrganisations = await UserOrganisation.findAll({
      where: { organisationId: currentOrg },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
          where,
          include: [
            {
              model: Role,
              as: "role",
            },
            {
              model: UserPreference,
              as: "preferences",
              attributes: {
                include: [
                  "lastLoginDate",
                  "lastLoginOrganisationId",
                  "licenseType",
                  "licenseRenewalDate",
                ],
              },
            },
          ],
        },
      ],
    });
    const users = userOrganisations.map((uo) => uo.user);
    return success(users);
  } catch (err) {
    return error(500, err);
  }
};

export const userAcrossOrgs = async (event) => {
  const loggedUser = event.context.user;
  try {
    const userOrganisations = await UserOrganisation.findAll({
      where: { userId: loggedUser.userId },
      include: [
        {
          model: Organisation,
          as: "organisation",
          attributes: ["id", "name", "address", "createdAt"],
          include: [
            {
              model: UserOrganisation,
              as: "userOrganisations",
              include: [
                {
                  model: User,
                  as: "user",
                  attributes: [
                    "id",
                    "fullName",
                    "email",
                    "gender",
                    "nextOfKin",
                    "nextOfKinContact",
                    "phone",
                    "address",
                    "dob",
                    "photo",
                    "createdAt",
                    "profileCompletion",
                    "status",
                  ],
                  include: [
                    {
                      model: Role,
                      as: "role",
                      attributes: ["id", "title", "color"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    const formattedData = userOrganisations.map((orgItem) => {
      const { userOrganisations, ...orgData } = orgItem.organisation.get({
        plain: true,
      });

      return {
        organisation: orgData,
        orgUsers: userOrganisations.map((uo) => ({
          ...uo.user, // user details
        })),
      };
    });
    return success(formattedData);
  } catch (err) {
    return error(500, err);
  }
};
export const updateUserPreferences = async (event) => {
  const body = await readBody(event);

  const { userId, taskTableColumns } = JSON.parse(body);
  if (!userId) {
    throw createError({ message: "userId required" });
  }
  if (!Array.isArray(taskTableColumns)) {
    throw createError({ message: "taskTableColumns must be an array" });
  }
  const isValid = taskTableColumns.every((col) => {
    return (
      typeof col === "object" &&
      typeof col.key === "string" &&
      typeof col.title === "string"
    );
  });
  if (!isValid) {
    throw createError({ message: "column should have key and title" });
  }
  try {
    const userPreference = await UserPreference.findOne({ where: { userId } });
    if (!userPreference) {
      throw createError({ message: "userPreference not found" });
    } else {
      userPreference.taskTableColumns = JSON.stringify(taskTableColumns);
      await userPreference.save();
    }
    return success("Preferences updated successfully");
  } catch (err) {
    console.log(err);
    return error(500, err.message);
  }
};

export const userDetails = async (event) => {
  const body = await readBody(event);
  const { id } = JSON.parse(body);
  const user = await User.findByPk(id);
  if (!user) throw createError({ message: "User not found" });
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: UserContract,
          as: "contract", // optional alias if defined
        },
        {
          model: UserAccount,
          as: "account",
        },
      ],
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }
    return success(user);
  } catch (err) {
    return error(500, err.message);
  }
};

export const updateContractDetails = async (event) => {
  const transaction = await sequelize.transaction();
  const body = await readBody(event);
  const { details, userId } = JSON.parse(body);
  try {
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid userId provided",
      });
    }
    let contract = await UserContract.findOne({
      where: { userId, id: details.id },
    });

    if (contract) {
      await contract.update(details, { transaction });
    } else {
      contract = await UserContract.create(
        {
          userId,
          ...details,
        },
        { transaction }
      );
    }
    await transaction.commit();
    return success("contract updated");
  } catch (err) {
    await transaction.rollback();
    return error(500, err.message);
  }
};

export const updateBankDetails = async (event) => {
  const body = await readBody(event);
  const { userId, account } = JSON.parse(body);
  try {
    const bankDetails = await UserAccount.findOne({
      where: { userId },
    });
    if (!bankDetails) {
      await UserAccount.create({ ...account, userId });
    } else {
      await bankDetails.update(account);
    }
    return success(bankDetails);
  } catch (err) {
    return error(500, err.message);
  }
};
