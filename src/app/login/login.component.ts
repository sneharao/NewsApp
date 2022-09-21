import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: true })
  userForm!: NgForm;

  constructor(private router: Router) { }

  onLogin(form: any) {
    if (form.valid) {
      this.router.navigate(['/home']);
      sessionStorage.setItem('userId', form.value.emailId);
    } else {
      alert('Please fill valid values');
    }
  }


}
