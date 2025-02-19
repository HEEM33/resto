import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ParametreComponent } from './parametre/parametre.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'setup', component: ParametreComponent},
];
