import { updateUserPreferences, userAcrossOrgs, usersList } from "~/server/controllers/users";
export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, "name");
    switch (path) {
      case "list":
        return await usersList(event);
      case "listOrgWise":
        return await userAcrossOrgs(event)
      case "updatePreferences":
        return await updateUserPreferences(event);
      default:
        return { code: 0, error: "Not found" };
    }
  });
  