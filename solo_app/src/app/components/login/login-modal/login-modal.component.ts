import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LoginService } from '../../../service/login/login.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [NgIf, SignInComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  @Input() isOpen: boolean;
  @Output() setIsOpen = new EventEmitter<boolean>();

  constructor(private loginService: LoginService) {}

  toggleLog(bool: boolean) {
    this.setIsOpen.emit(bool);
  }
}
