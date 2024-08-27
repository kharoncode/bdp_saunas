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
import { Sauna, Sauna_body } from '../../services/types/sauna';

@Component({
  selector: 'app-sauna-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './sauna-form.component.html',
  styleUrl: './sauna-form.component.scss',
})
export class SaunaFormComponent implements OnChanges {
  @Input() sauna: Sauna;
  @Output() handleSubmit = new EventEmitter<Sauna_body>();

  ngOnChanges(): void {
    this.sauna &&
      this.saunaForm.patchValue({
        name: this.sauna.name,
        size: this.sauna.size,
      });
  }
  saunaForm = new FormGroup({
    name: new FormControl('Nouveau Sauna', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    size: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

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
      };

      this.handleSubmit.emit(newSauna);
    }
  }
}
