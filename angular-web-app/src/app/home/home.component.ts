import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users!: User[];
  user: User = new User();

  constructor(  private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = (data)["rows"]; //need to remove, "rows part of parsed JSON file to just get array"
    })
  }

  userDetails(steamID: number) {
    this.router.navigate(['users', steamID]);
    console.log(steamID);
  }

}
