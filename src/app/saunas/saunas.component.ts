import { Component, OnInit } from '@angular/core';
import { SaunasService } from '../service/sauna/saunas.service';
import { Sauna } from '../service/type/sauna';
import { NgFor } from '@angular/common';
import { SaunaFormComponent } from '../components/sauna-form/sauna-form.component';

@Component({
  selector: 'app-saunas',
  standalone: true,
  imports: [NgFor, SaunaFormComponent],
  templateUrl: './saunas.component.html',
  styleUrl: './saunas.component.scss',
})
export class SaunasComponent implements OnInit {
  saunasList: Sauna[] = [];
  constructor(private saunasService: SaunasService) {}

  ngOnInit(): void {
    this.saunasService.getSaunas().subscribe({
      next: (saunas) => {
        this.saunasList = saunas;
      },
    });
  }
}
