import {
   Component,
   EventEmitter,
   Input,
   OnChanges,
   Output,
} from '@angular/core';
import {
   FormControl,
   FormGroup,
   FormsModule,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { User, User_body } from '../../services/types/user';

@Component({
   selector: 'app-user-form',
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
   templateUrl: './user-form.component.html',
   styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
   @Input() user: User;
   @Output() handleSubmit = new EventEmitter<User_body>();

   ngOnChanges(): void {
      this.user &&
         this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            password: this.user.password,
         });
   }
   userForm = new FormGroup({
      firstName: new FormControl('Prénom', [
         Validators.required,
         Validators.maxLength(30),
      ]),
      lastName: new FormControl('Nom', [
         Validators.required,
         Validators.maxLength(30),
      ]),
      username: new FormControl('Login', [
         Validators.required,
         Validators.maxLength(30),
      ]),
      password: new FormControl('1234', [
         Validators.required,
         Validators.min(1),
      ]),
   });

   handleFormSubmit($event: Event) {
      $event.preventDefault();
      const firstName = this.userForm.value.firstName;
      const lastName = this.userForm.value.lastName;
      const username = this.userForm.value.username;
      const password = this.userForm.value.password;
      if (!this.userForm.valid) {
         return;
      }
      if (firstName && lastName && username && password) {
         const newUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
         };

         this.handleSubmit.emit(newUser);
         this.userForm.reset();
      }
   }
}
