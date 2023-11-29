import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';
import { UserRegisterService } from 'src/app/services/user-register.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage{
  form: FormGroup;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: UserRegisterService, private userService: UserService ) {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.pattern(RegularExpression.Password)])
    });
  }

  login() {
    if (this.form.valid) {
      const emailControl = this.form.get('email');
      const passwordControl = this.form.get('password');
  
      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        this.authService.login({ identifier: email, password })
          .subscribe(
            (response: any) => {
              this.userService.setUserData(response);
              this.router.navigate(['/home']);
            },
            (error) => {
              console.error(error);
            }
          );
      }
    }
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  forgotPass() {
    this.router.navigate(['/forgot-password']);
  }

}
