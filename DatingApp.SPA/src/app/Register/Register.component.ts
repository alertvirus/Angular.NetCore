import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
  this.authService.register(this.model).subscribe(()=>{
    console.log("registration successful");
  }, error =>{
    console.log(error);
  })
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }
}
