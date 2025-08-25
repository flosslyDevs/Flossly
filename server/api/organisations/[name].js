import {
  addContacts,
  addEquipment,
  addGroup,
  addPriority,
  addStatus,
  addSurgery,
  getdetails,
  getPriorities,
  getStatuses,
  updateAttributes,
  updateOrganisationDetails,
  updatePriorities,
  updateStatuses,
  deleteAttribute
} from "~/server/controllers/organisation";
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "name");
  switch (path) { 
    case "update":
      return await updateOrganisationDetails(event);
    case "priorities":
      return await getPriorities(event);
    case "statuses":
      return await getStatuses(event);
    case "updatePriorities":
      return await updatePriorities(event);
    case "updateStatuses":
      return await updateStatuses(event);
    case "addPriority":
      return await addPriority(event);
    case "addStatus":
      return await addStatus(event);
    case "details":
      return await getdetails(event);
    case "addEquipment": 
      return await addEquipment(event);
    case "addContacts":
      return await addContacts(event);
    case "addGroup":
      return await addGroup(event);
    case "addSurgery":
      return await addSurgery(event);
    case "updateAttribute":
      return await updateAttributes(event);
    case "deleteAttribute":
      return await deleteAttribute(event)
    default:
      return { code: 0, error: "Not found" };
  }
});
