import { Component, OnInit, signal } from '@angular/core';
import { SaunasService } from '../service/sauna/saunas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isFull: boolean = false;
  constructor(private isFullService: SaunasService) {}
  ngOnInit(): void {
    this.isFullService.isFull().subscribe({
      next: (res) => {
        this.isFull = res.isFull;
      },
    });
  }
}
