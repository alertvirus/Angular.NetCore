import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'selenium-webdriver';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, private router:Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Failed to login');
    },()=>{
      this.router.navigate(['/members']);

    });
  }

  logout(){
    this.authService.userToken = null;
    localStorage.removeItem('token');

    this.alertify.message("Logged Out");
    this.router.navigate(['/home']);
  }

  loggedIn(){
    return  this.authService.loggedIn();
  }
  
}
