import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    token = {
        headers: new HttpHeaders().set('Authorizaation', environment.token),
    };

    refreshToken() {
        this.token = {
            headers: new HttpHeaders().set('Authorization', environment.token),

        };
    }

    signUp(user: User):Observable<User> {
        return this.http.post<User>('http://localhost:3000/users/signup', user)
    }

    login(userLogin: UserLogin):Observable<UserLogin> {
        return this.http.post<UserLogin>('http://localhost:3000/users/login', userLogin)
    }

    loggedIn() {
        let ok: boolean = false

        if(environment.token != '') {
            ok = true
        }

        return ok
    }

}