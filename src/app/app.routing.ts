import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {path: 'login', component: LoginComponent },
    {path: 'signup', component: SignUpComponent},

    { path: '**', redirectTo:''}
];


export const appRoutingMoudule = RouterModule.forRoot(routes);