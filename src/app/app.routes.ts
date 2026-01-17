import { Routes } from '@angular/router';
import { Play } from './play/play';
import { Login } from './login/login';
import { playGuard } from './play-guard';
import { Register } from './register/register';
import { Home } from './home/home';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'play', component: Play, canActivate: [playGuard] }
];
