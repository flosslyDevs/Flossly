export const currentPath = (path) => {
  if (
    path === "/login" ||
    path.includes("/password") ||
    path === "/signup" ||
    path === "/forgetpassword" ||
    path.includes("/verifyemail") ||
    path.includes("profile") ||
    path.includes('logout')||
    path.includes('inviteverification')
  ) {
    return false;
  }
  return true;
};
