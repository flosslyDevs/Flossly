import { Role, UserPreference, UserSubscription } from "../models";
import { success, error } from "../utils/response";
export const addRoles = async (event) => {
  const body = await readBody(event);
  const { roles } = body;
  try {
    await Role.bulkCreate(roles);
    return success("Roles Added");
  } catch (err) {
    return error(500, err);
  }
};

export const getRoles = async (event) => {
  try {
    const roles = await Role.findAll();
    if (roles && roles.length) {
      return success(roles);
    } else {
      return success([]);
    }
  } catch (err) {
    error(500, err);
  }
};

export const getConfigs = async (event) => {
  // const loggedUser = event.context.user
  // const userPreference = await UserPreference.findOne({ where: { userId: loggedUser.id }})
  // const subscription = await UserSubscription.findOne({ where: { userId: loggedUser.id, organisationId: loggedUser.orgid }})
  // if (!userPreference) return error(404, "preference not found")
  //   const configs = {
  // subscriptionStatus: subscription.stripeSubscriptionStatus,
  // }

}
