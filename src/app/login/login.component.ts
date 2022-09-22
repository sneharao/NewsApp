import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Login screen where user enter email and password to login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: true })
  userForm!: NgForm;

  constructor(private router: Router) { }

  /**
   * onLogin is called on click of Login now after user enters email id and password
   * if form is valid , it redirects to home screen or throws alert
   * @param form , the form present in the template view
   */
  onLogin(form: NgForm) {
    if (form.valid) {
      this.router.navigate(['/home']);
      sessionStorage.setItem('userId', form.value.emailId);
    } else {
      alert('Please fill valid values');
    }
  }


}
