import { addRoles, getConfigs, getRoles } from "~/server/controllers/misc";

export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, "name");
    switch (path) {
      case "addRoles":
        return await addRoles(event);
      case "getRoles":
        return await getRoles(event);
      case "getConfigs":
        return await getConfigs(event)
      default:
        return { code: 0, error: "Not found" };
    }
  });
  