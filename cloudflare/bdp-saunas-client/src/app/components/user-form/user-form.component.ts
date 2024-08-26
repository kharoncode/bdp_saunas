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
import { User, User_body } from '../../service/type/users';
import { NgClass, NgIf } from '@angular/common';

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
        username: this.user.username,
        password: this.user.password,
      });
  }
  userForm = new FormGroup({
    username: new FormControl('Nouvel Utilisateur', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    password: new FormControl('1234', [Validators.required, Validators.min(1)]),
  });

  handleFormSubmit($event: Event) {
    $event.preventDefault();
    const username = this.userForm.value.username;
    const password = this.userForm.value.password;
    if (!this.userForm.valid) {
      return;
    }
    if (username && password) {
      const newUser = {
        username: username,
        password: password,
      };

      this.handleSubmit.emit(newUser);
      this.userForm.reset();
    }
  }
}
