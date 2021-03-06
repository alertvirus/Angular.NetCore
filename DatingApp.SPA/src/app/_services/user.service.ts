import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {
    
    baseUrl= 'http://localhost:5000/api/';

constructor(private authHttp: AuthHttp) { }

    getUsers(): Observable<User[]> {
        return this.authHttp.get(this.baseUrl + 'users')
        .map(response=> <User[]>response.json())
        .catch(this.handleError);
    }
    getUser(id): Observable<User>{
        return this.authHttp
        .get(this.baseUrl + 'users/' + id)
        .map(response=> <User>response.json())
        .catch(this.handleError);
        
    }
    updateUser(id: number, user: User){
        return this.authHttp.put(this.baseUrl + 'users/' + id, user)
        .catch(this.handleError);
    }

    private handleError(error :any){
        //Applicaton Error
        const applicationError = error.headers.get('Application-Error');
        if(applicationError){
            return Observable.throw(applicationError); 
        }

        //Server Error
        const serverError = error.json();
        let modelStateErrors = "";
        if(serverError){
            for(const key in serverError){
                if(serverError[key]){
                    modelStateErrors += serverError[key] + "\n";
                }
            }
        }

        return  Observable.throw(
            modelStateErrors || 'Server Error'
        );
    };
}

