let b64DecodeUnicode = (str) =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join("")
  );

let parseJwt = (token) =>
  JSON.parse(
    b64DecodeUnicode(token.split(".")[1].replace("-", "+").replace("_", "/"))
  );

// SetTimeOut to Auto Logout when token expires
const autoLogout = (token, router, dispatch) => {
  const timeToLogout = new Date(parseJwt(token).exp * 1000);
  const timeNow = new Date();
  const timeDiff = timeToLogout.getTime() - timeNow.getTime();

  setTimeout(() => {
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  }, timeDiff);
};

export default autoLogout;
