import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'selenium-webdriver';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('Logged in successfully');
    }, error => {
      console.log('failed to login');
    });
  }

  logout(){
    this.authService.userToken = null;
    localStorage.removeItem('token');

    console.log("Logged Out");
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return  !!token;
  }
  
}
