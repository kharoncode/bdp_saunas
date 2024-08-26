import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-add-button',
   standalone: true,
   imports: [],
   templateUrl: './add-button.component.html',
   styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
   @Output() setIsOpen = new EventEmitter<boolean>();
   @Output() setForm = new EventEmitter<string>();
   openModal() {
      this.setIsOpen.emit(true);
   }
   setAddForm() {
      this.setForm.emit('add');
   }
}
