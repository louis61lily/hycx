// 是否允许进入页面
export const isAccessible = () => {
  return localStorage.getItem("token") || null;
};
