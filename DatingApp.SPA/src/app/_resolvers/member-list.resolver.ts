import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'

@Injectable()
export class MemberListResolver implements Resolve<User>{

    constructor(private userService: UserService, private router:Router, private alertify:AlertifyService){}   
    
    resolve(route :ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUsers().catch(error => {
            this.alertify.error("problem retreiving data");
            this.router.navigate(['/lists']);
            return Observable.of(null);
        })
    }
}