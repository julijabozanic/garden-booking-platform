import { CanActivateFn } from '@angular/router';

export const decoratorGuard: CanActivateFn = (route, state) => {
  const loggedUser = localStorage.getItem("logged");
  const userType = localStorage.getItem("loggedUserType");

  if (loggedUser && userType === "D") {
    return true;
  } else {
    alert("Pristup dozvoljen samo dekoraterima.");
    return false;
  }
};