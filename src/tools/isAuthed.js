// 是否是管理员用户
export const isAuthenticated = (type) => {
  return type === "admin" ? true : false;
};
