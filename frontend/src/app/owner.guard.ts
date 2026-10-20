import { CanActivateFn } from '@angular/router';

export const ownerGuard: CanActivateFn = (route, state) => {

  const loggedUser = localStorage.getItem("logged");
  const userType = localStorage.getItem("loggedUserType");

  if (loggedUser && userType === "O") {
    return true;
  } else {
    alert("Pristup dozvoljen samo vlasnicima.");
    return false;
  }
  // if(
  //   localStorage.getItem("logged")!=null
  // ) return true;
  // else {
  //   alert("No")
  //   return false;
  // }
};
