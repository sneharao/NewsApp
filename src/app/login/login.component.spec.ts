import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([]), FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('h3').textContent).toBe('Login to get Access to your personalized news');
  });

  it('should allow user to go to home when values entered are valid', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let userEmail = component.userForm.form.controls['emailId'];
      userEmail.setValue('sne@gm.com');
      let password = component.userForm.form.controls['password'];
      password.setValue('1234');

      expect(component.userForm.valid).toBeTruthy();
      const submitButton = fixture.debugElement.nativeElement.querySelector('button');
      const routerSpy = spyOn(router, 'navigate');
      submitButton.click();
      expect(routerSpy).toHaveBeenCalledWith(['/home']);
    });
  }));

  it('form is invalid if email is not in correct', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let userEmail = component.userForm.form.controls['emailId'];
      userEmail.setValue('sne');
      expect(component.userForm.invalid).toBeTruthy();
    });
  }));

  it('form is invalid if email is not entered', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let userEmail = component.userForm.form.controls['emailId'];
      userEmail.setValue('');
      expect(component.userForm.invalid).toBeTruthy();
    });
  }));

  it('form is invalid if password is not entered', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let password = component.userForm.form.controls['password'];
      password.setValue('');
      expect(component.userForm.invalid).toBeTruthy();
    });
  }));

  it('user is shown alert when user enters invalid email and click on submit', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let userEmail = component.userForm.form.controls['emailId'];
      userEmail.setValue('');

      const submitButton = fixture.debugElement.nativeElement.querySelector('button');
      const alertSpy = spyOn(window, 'alert');
      submitButton.click();
      expect(alertSpy).toHaveBeenCalledWith('Please fill valid values');
    });
  }));









  // it('should not allow user to navigate when form is not valid', () => {
  //   const formTest = ({ emailId: 'sneha.com', password: 'sne' });
  //   component.onLogin(formTest);
  //   const routerSpy = spyOn(router,'navigate');
  //   expect(routerSpy).not.toHaveBeenCalled();

  // });

});
