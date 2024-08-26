import { Component } from '@angular/core';
import { User, User_body } from '../service/type/users';
import { NgFor } from '@angular/common';
import { ModalComponent } from '../components/modal/modal.component';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { AddButtonComponent } from '../components/add-button/add-button.component';
import { UserService } from '../service/user/user.service';

@Component({
   selector: 'app-users',
   standalone: true,
   imports: [NgFor, ModalComponent, UserFormComponent, AddButtonComponent],
   templateUrl: './users.component.html',
   styleUrl: './users.component.scss',
})
export class UsersComponent {
   modalIsOpen: boolean = false;
   whichForm: string = 'add';
   usersList: User[] = [];
   userSelected: User = {
      id: '0',
      firstName: 'Prénom',
      lastName: 'Nom',
      username: 'Login',
      password: '',
      status: false,
   };
   constructor(private userService: UserService) {}

   ngOnInit(): void {
      this.userService.getUsers().subscribe({
         next: (users) => {
            this.usersList = users;
         },
      });
   }

   toggleModal(bool: boolean) {
      this.modalIsOpen = bool;
   }

   toggleForm(form: string) {
      this.whichForm = form;
   }

   handleAddUserSubmit(data: User_body) {
      this.userService.postUser(data).subscribe({
         next: (users) => {
            this.usersList = users;
         },
      });
   }

   handleEditUserSubmit(data: User_body) {
      const editUser = { id: this.userSelected.id, data: data };
      this.userService.editUser(editUser).subscribe({
         next: (users) => {
            this.usersList = users;
            this.modalIsOpen = false;
         },
      });
   }

   selectUser(user: User) {
      this.userSelected = user;
      this.modalIsOpen = true;
   }

   handleDeleteUserSubmit(id: string) {
      this.userService.deleteUser({ id: id }).subscribe({
         next: (users) => {
            this.usersList = users;
         },
      });
   }
}
