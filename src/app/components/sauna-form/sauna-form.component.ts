import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SaunasService } from '../../service/saunas.service';

type Sauna_body = {
  name: string;
  size: number;
  customers: number;
};

@Component({
  selector: 'app-sauna-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './sauna-form.component.html',
  styleUrl: './sauna-form.component.scss',
})
export class SaunaFormComponent {
  saunaForm = new FormGroup({
    name: new FormControl('Nouveau Sauna', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    size: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  constructor(private saunasService: SaunasService) {}

  handleFormSubmit($event: Event) {
    $event.preventDefault();
    const name = this.saunaForm.value.name;
    const size = this.saunaForm.value.size;
    if (!this.saunaForm.valid) {
      return;
    }
    if (name && size) {
      const newSauna = {
        name: name,
        size: size,
        customers: 0,
      };
      this.saunasService.postSauna(newSauna).subscribe({
        next: (saunas) => {},
      });
      console.log(newSauna);
    }
  }
}
