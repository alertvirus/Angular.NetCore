import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'selenium-webdriver';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('failed to login');
    });
  }

  logout(){
    this.authService.userToken = null;
    localStorage.removeItem('token');

    this.alertify.message("Logged Out");
  }

  loggedIn(){
    return  this.authService.loggedIn();
  }
  
}
