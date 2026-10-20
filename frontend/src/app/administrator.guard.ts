import { CanActivateFn } from '@angular/router';

export const administratorGuard: CanActivateFn = (route, state) => {
  const loggedUser = localStorage.getItem("logged");
  const userType = localStorage.getItem("loggedUserType");

  if (loggedUser && userType === "A") {
    localStorage.clear();
    return true;
  } else {
    alert("Pristup dozvoljen samo administratorima.");
    return false;
  }
};