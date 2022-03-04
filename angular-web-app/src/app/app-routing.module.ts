import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinkWithSteamComponent } from './link-with-steam/link-with-steam.component';
import { LoginWithSteamComponent } from './login-with-steam/login-with-steam.component';
import { MyLeaderboardsComponent } from './my-leaderboards/my-leaderboards.component';

const routes: Routes = [
  { path: 'link-with-steam', component: LinkWithSteamComponent },
  { path: 'login-with-steam', component: LoginWithSteamComponent }, 
  { path: "home", component: HomeComponent },
  { path: "my-leaderboards", component: MyLeaderboardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
