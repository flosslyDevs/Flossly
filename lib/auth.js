export const isAuthenticated = () => {
  const token = useCookie("accessToken");
  if (token && token.value) return true;
  else return false;
};

export const loggedUserId = () => {
  const user = useCookie("loggedUserId");
  if (user && user.value) return user.value;
  else return false;
};

export const profileCompletion = () => {
  const percentage = useCookie("profileCompletion");
  if (percentage && percentage.value >= 0)
    return parseInt(percentage.value, 10);
  else return 2;
};

export const userRole = () => {
  const percentage = useCookie("role");
  if (percentage && percentage.value >= 0)
    return parseInt(percentage.value, 10);
  else return 0;
};
