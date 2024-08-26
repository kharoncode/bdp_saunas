import { Component, OnInit } from '@angular/core';
import { SaunasService } from '../service/sauna/saunas.service';
import { Sauna, Sauna_body } from '../service/type/sauna';
import { NgFor } from '@angular/common';
import { SaunaFormComponent } from '../components/sauna-form/sauna-form.component';
import { ModalComponent } from '../components/modal/modal.component';
import { AddButtonComponent } from '../components/add-button/add-button.component';

@Component({
   selector: 'app-saunas',
   standalone: true,
   imports: [NgFor, SaunaFormComponent, ModalComponent, AddButtonComponent],
   templateUrl: './saunas.component.html',
   styleUrl: './saunas.component.scss',
})
export class SaunasComponent implements OnInit {
   modalIsOpen: boolean = false;
   whichForm: string = 'add';
   saunasList: Sauna[] = [];
   saunaSelected: Sauna = { id: 0, name: 'Nouveau Sauna', size: 1, status: 0 };
   constructor(private saunasService: SaunasService) {}

   ngOnInit(): void {
      this.saunasService.getSaunas().subscribe({
         next: (saunas) => {
            this.saunasList = saunas;
         },
      });
   }

   toggleModal(bool: boolean) {
      this.modalIsOpen = bool;
   }

   toggleForm(form: string) {
      this.whichForm = form;
   }

   handleAddSaunaSubmit(data: Sauna_body) {
      this.saunasService.postSauna(data).subscribe({
         next: (saunas) => {
            this.saunasList = saunas;
         },
      });
   }

   handleEditSaunaSubmit(data: Sauna_body) {
      const editSauna = { id: this.saunaSelected.id, data: data };
      this.saunasService.editSauna(editSauna).subscribe({
         next: (saunas) => {
            this.saunasList = saunas;
            this.modalIsOpen = false;
         },
      });
   }

   selectSauna(sauna: Sauna) {
      this.saunaSelected = sauna;
      this.modalIsOpen = true;
   }

   handleDeleteSaunaSubmit(id: number) {
      this.saunasService.deleteSauna({ id: id }).subscribe({
         next: (saunas) => {
            this.saunasList = saunas;
         },
      });
   }
}
