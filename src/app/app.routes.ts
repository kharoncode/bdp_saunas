import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SaunasComponent } from './saunas/saunas.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'saunas',
    component: SaunasComponent,
  },
  { path: '*', component: ErrorComponent },
];
