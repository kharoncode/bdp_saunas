import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SaunasComponent } from './saunas/saunas.component';
import { ErrorComponent } from './error/error.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'saunas',
    component: SaunasComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  { path: '**', component: ErrorComponent },
];
