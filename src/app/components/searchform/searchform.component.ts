import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GithubService } from '../../services/github.service';
//import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';


import { GithubUser } from '../../model/IGithubUser';

@Component({
    //  moduleId: module.id,
    selector: 'searchform',
    templateUrl: 'searchform.component.html'
})


export class SearchformComponent implements OnInit {
    @Input() githubUser: GithubUser;
    @Output() userUpdated: EventEmitter<GithubUser> = new EventEmitter<GithubUser>();
    noUser = " ";
    users: any = "";


    constructor(private _githubService: GithubService) {
        // Component'e input olarak geçilen parametre burada undefined, OnInit'te Object halinde.
    }

    ngOnInit() {
        // this.users =
        this.getListUsers();

        if (this.githubUser) {
            this.githubUser.user = false;
            this.getUserInformation();
        }

    }

    getListUsers() {

        this._githubService.getAllUsers().subscribe((data) => {
            //console.log(data);
            this.users = data;
            // console.log(this.users);
        }
        )
    }

    searchUser() {

        if (this.githubUser.userName && this.githubUser.userName.length > 0) {
            this._githubService.updateUser(this.githubUser.userName);
            this.getUserInformation();
            document.getElementById("usersList").style.display = "none";
            document.getElementById("noUser").style.display="none";
        } else {
            this.githubUser.user = false;
            document.getElementById("noUser").style.display="block";
           // document.getElementById("invalidUser").style.display="none";
        }
    }

    getUserInformation() {
        if (this.githubUser.userName && this.githubUser.userName.length > 0) {

            this._githubService.getUser().subscribe(user => {
                this.githubUser.user = user;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );

            this._githubService.getRepos().subscribe(repos => {
                // console.log(repos);
                this.githubUser.repos = repos;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );

        }
    }
}