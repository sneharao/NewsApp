import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockSessionStorage = {
    getItem: (key: string): string => {
      return 'sn@hm.com';
    },
    getEmptyItem: (key: string) => {
      return null;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login when user is not logged in', () => {
    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getEmptyItem);
    expect(guard.canActivate()).toBe(false);
  });

  it('should load home when user is logged in', () => {
    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    expect(guard.canActivate()).toBe(true);
  });
});
