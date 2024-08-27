import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SaunasComponent } from './saunas/saunas.component';
import { UsersComponent } from './users/users.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'saunas', component: SaunasComponent },
  { path: '**', component: ErrorComponent },
];
