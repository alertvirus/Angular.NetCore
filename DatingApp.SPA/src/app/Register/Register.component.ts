import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ThrowStmt } from '@angular/compiler';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  //to store inputs from form
  model :any = {};

  //@Input() valuesFromHome:any;
  //output needs to initiate a new instance of event emitter
  @Output()cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
  this.authService.register(this.model).subscribe(()=>{
    this.alertify.success("registration successful");
  }, error =>{
    this.alertify.error(error);
  })
  }

  cancel(){
    this.cancelRegister.emit(false);
    this.alertify.message("Cancelled");
  }
}
