import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DesktopComponent} from './desktop/desktop.component';

import { AuthGuard }      from './auth-guard.service';
import { AuthService }    from './auth.service';

const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'home', component:DesktopComponent, canActivate:[AuthGuard]},
    { path: '**', redirectTo:'login'}
];

export const appRoutingProviders: any[] = [
  [AuthGuard, AuthService]
];

export const appRouting = RouterModule.forRoot(routes); 



