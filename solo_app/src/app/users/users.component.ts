import { Component } from '@angular/core';
import { User, User_body } from '../service/type/users';
import { LoginService } from '../service/login/login.service';
import { NgFor } from '@angular/common';
import { ModalComponent } from '../components/modal/modal.component';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, ModalComponent, UserFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  modalIsOpen: boolean = false;
  usersList: User[] = [];
  userSelected: User = {
    id: '0',
    username: 'Nouvel Utilisateur',
    password: '',
  };
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getUsers().subscribe({
      next: (users) => {
        this.usersList = users;
      },
    });
  }

  toggleModal(bool: boolean) {
    this.modalIsOpen = bool;
  }

  handleAddUserSubmit(data: User_body) {
    this.loginService.postUser(data).subscribe({
      next: (users) => {
        this.usersList = users;
      },
    });
  }

  handleEditUserSubmit(data: { username: string; password: string }) {
    const editUser = { id: this.userSelected.id, data: data };
    this.loginService.editUser(editUser).subscribe({
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
    this.loginService.deleteUser({ id: id }).subscribe({
      next: (users) => {
        this.usersList = users;
      },
    });
  }
}
