import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    rememberMe: new FormControl(false),
  });

  isFocus = {
    login: false,
    password: false,
  };

  //constructor(private userService: UserService) {}

  handleSubmit($event: Event) {
    $event.preventDefault;
    const data = {
      login: this.signInForm.value.login,
      password: this.signInForm.value.password,
      rememberMe: this.signInForm.value.rememberMe,
    };
    if (!this.signInForm.valid) {
      return;
    }
    // this.userService
    //    .postUser({
    //       firstName: 'FirstName',
    //       lastName: 'LastName',
    //       mail: 'firstname@lastname.com',
    //       phone: '0033612345678',
    //       password: '1234',
    //    })
    //    .subscribe({
    //       next: (user) => {
    //          console.log(user);
    //       },
    //    });
    console.log(data);
    this.signInForm.reset();
  }

  onFocus(input: 'login' | 'password', status: boolean) {
    this.isFocus[input] = status;
  }
}
