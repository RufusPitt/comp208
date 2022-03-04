import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MyLeaderboardsComponent } from './my-leaderboards/my-leaderboards.component';
import { LinkWithSteamComponent } from './link-with-steam/link-with-steam.component';
import { LoginWithSteamComponent } from './login-with-steam/login-with-steam.component';
import { HomeComponent } from './home/home.component';


//const routes: Routes = [
//  { path: 'link-with-steam', component: LinkWithSteamComponent },
//  { path: 'login-with-steam', component: LoginWithSteamComponent }, 
//];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    MyLeaderboardsComponent,
    LinkWithSteamComponent,
    LoginWithSteamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
