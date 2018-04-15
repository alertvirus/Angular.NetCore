import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
// import { listenerCount } from 'cluster';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
constructor(private http: Http) { }

    login(model: any) {
        // const headers = new Headers({'Content-type': 'application/json'});
        // const options = new RequestOptions({headers: headers});
        return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
            const user = response.json();
            if (user && user.tokenString) {
                localStorage.setItem('token', user.tokenString);
                this.userToken = user.tokenString;
            }
        });
    }

    register(model: any){
        return  this.http.post(this.baseUrl + 'register',model, this.requestOptions());
    }

    private requestOptions(){
        const headers = new Headers({'Content-type': 'application/json'});
        return new RequestOptions({headers: headers});
    }
}