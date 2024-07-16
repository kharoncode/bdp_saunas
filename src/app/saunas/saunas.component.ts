import { Component, OnInit } from '@angular/core';
import { SaunasService } from '../service/saunas.service';
import { Saunas } from '../service/saunas';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-saunas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './saunas.component.html',
  styleUrl: './saunas.component.scss',
})
export class SaunasComponent implements OnInit {
  saunasList: Saunas[] = [];
  constructor(private saunasService: SaunasService) {}
  ngOnInit(): void {
    this.saunasService.getSaunas().subscribe({
      next: (saunas) => {
        this.saunasList = saunas;
      },
    });
  }
}
