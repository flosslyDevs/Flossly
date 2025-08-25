import {
  getPointHistory,
  getLoyaltyPoints,
  getRewardPonits,
  redeemLoyaltyPoints,
  getRedeemedPoints,
  referPractice,
  addRewardPonits,
  feedBack,
} from "~/server/controllers/points";
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "name");
  switch (path) {
    case "history":
      return await getPointHistory(event);
    case "loyaltyPoints":
      return await getLoyaltyPoints(event);
    case "rewardPoints":
      return await getRewardPonits(event);
    case "addRewardPoints":
      return await addRewardPonits(event);
    case "redeemLoyaltyPoint":
      return await redeemLoyaltyPoints(event);
    case "redeemedPoints":
      return await getRedeemedPoints(event);
    case "referPractice":
      return await referPractice(event);
    case "feedback":
      return await feedBack(event);
    default:
      return { code: 0, error: "Not found" };
  }
});
