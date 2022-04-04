import { of } from 'rxjs';

export class AuthServiceStub {

  getProfileApi() {
    return of({
        "name":"King Julien",
        "email":"kingj@email.com",
        "bio":"Hi my name is King Julien and I like to move it move it.",
        "img":"https://tinyurl.com/2p9953zy"
    });
  }

  setIsAuthenticated(flag: boolean) {
    return of(flag);
  }

  getIsAuthenticated() {
    return of(true);
  }

  registerApi() {
    return of({
      success: true
    });
  }
}