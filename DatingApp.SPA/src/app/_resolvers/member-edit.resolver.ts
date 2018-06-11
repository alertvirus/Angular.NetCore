import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService, private authService: AuthService,
        private router:Router, private alertify:AlertifyService){}   
    
    resolve(route :ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).catch(error => {
            this.alertify.error("problem retreiving data");
            this.router.navigate(['/members']);
            return Observable.of(null);
        })
    }
}