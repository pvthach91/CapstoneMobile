import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AuthLoginInfo} from "../../auth/login-info";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit{
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  form: any = {};
  private loginInfo: AuthLoginInfo;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public userData: UserData,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.tokenStorage.isLoggedIn()) {
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // this.userData.login(this.login.username);
      // this.router.navigateByUrl('/app/tabs/schedule');

      this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);

      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          if (data.success == true) {
            this.tokenStorage.saveToken(data.data.accessToken);
            this.tokenStorage.saveUsername(data.data.username);
            this.tokenStorage.saveFullName(data.data.fullName);
            this.tokenStorage.saveAuthorities(data.data.authorities);
            this.router.navigateByUrl('/app/tabs/schedule');
          } else {
            console.log('failed:' + data.message);
          }
        },
        error => {
          console.log('failed');
        }
      );


    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
