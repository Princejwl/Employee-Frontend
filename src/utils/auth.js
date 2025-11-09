export const setUser = (user) => localStorage.setItem("uid", user?.uid || "");
export const getUid = () => localStorage.getItem("uid");
export const clearUser = () => localStorage.removeItem("uid");
export const isLoggedIn = () => !!getUid();
