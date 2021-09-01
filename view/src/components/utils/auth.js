import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCokiesAuth = (infoAuth) => {
  cookies.set("auth", infoAuth, { path: "/" });
};

export const isLogIn = () => {
  return cookies.get("auth");
};

export const getAuthFromCookie = () => {
  if (isLogIn()) {
    const value = cookies.get("auth");
    return value;
  }
  return null;
};

export const logOut = () => {
  cookies.remove("auth", { path: "/" });
  window.location.href = "./";
};
