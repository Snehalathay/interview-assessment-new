import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from './auth.service';
import { AuthServiceStub } from './mocks/AuthService.mock';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([
        { path: 'register', pathMatch: 'full', component: RegistrationFormComponent }
      ])],
      providers: [{ provide: AuthService, useClass: AuthServiceStub }],
    });
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('be able to hit route when user is logged in', () => {
      spyOn(authService, 'getIsAuthenticated').and.returnValue(true);
      expect(guard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
    spyOn(authService, 'getIsAuthenticated').and.returnValue(false);
    expect(guard.canActivate()).toBe(false);
  });

});
