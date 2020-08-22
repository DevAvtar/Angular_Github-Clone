import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs';
//import 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class GithubService {
    private userName: string;
    // private clientId: string = '<Client Id>';
    // private clientSecret: string = '<Client Secret Key>';
    private clientId: string = '';
    private clientSecret: string = '';

    constructor(private _http: HttpClient) {
        // console.log('Github Service Ready.');
        this.userName = '';
    }

    getAllUsers():Observable<any> {
        const url = "https://api.github.com/users?per_page=100";
        return this._http.get(url)
    
      }

    getUser() {

    let originalName = this.userName.split(" ").join("");

        if (originalName) {
            return this._http.get('http://api.github.com/users/' + originalName)
                // + '?client_id=' + this.clientId
                // + '&client_secret=' + this.clientSecret)
                .pipe(map(res => res))
               // .catch(this.handleError);
        }

        // if (this.userName) {
        //     return this._http.get('http://api.github.com/users/' + this.userName)
        //    commented     // + '?client_id=' + this.clientId
        //     commented    // + '&client_secret=' + this.clientSecret)
        //         .pipe(map(res => res))
        //     commented   // .catch(this.handleError);
        // }



        // Bu şekilde de dönen değer üzerinden hatalar yakalanabilir. Ya da catch te....
        // .map(res => {
        //     console.log(res);
        //     if (res.status != 200) {
        //         throw new Error('This request has failed ' + res.status);
        //     }
        //     else {
        //         return res.json();
        //     }
        // })
    }

    getRepos() {
        if (this.userName) {
            return this._http.get('http://api.github.com/users/' + this.userName
                + '/repos?client_id=' + this.clientId
                + '&client_secret=' + this.clientSecret)
                .pipe(map(res => res))
                // .catch(this.handleError);
        }

    }

    updateUser(userName: string) {
        this.userName = userName;
    }

    private handleError(error: any) {

        if (error.status === 401) {
            return Observable.throw(error.status);
        } else {
            return Observable.throw(error.status || 'Server error');
        }
    }
}