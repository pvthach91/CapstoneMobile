import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AuthLoginInfo} from "../../auth/login-info";
import {AlertController} from "@ionic/angular";
import {ConfigurationStorage} from "../../services/configuration-storage.service";
import {ConfigurationSingletonService} from "../../services/configuration-singleton.service";



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
    public alertController: AlertController,
    private tokenStorage: TokenStorageService,
    public userData: UserData,
    private configurationSingletonService: ConfigurationSingletonService,
    private configurationStorage: ConfigurationStorage,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.tokenStorage.isLoggedIn()) {
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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
            if(!this.tokenStorage.hasAdminRole()) {
              this.storeConfiguration();
            }

            this.reloadPage();
            // this.router.navigateByUrl('/app/tabs/schedule');
          } else {
            this.presentAlert('Login failed', '', data.message);
          }
        },
        error => {
          this.presentAlert('Login failed', '', 'Please check your username and password');
        }
      );


    }
  }

  reloadPage() {
    let defaultPage = this.tokenStorage.getDefaultPage();
    this.router.navigate([defaultPage]);
  }

  storeConfiguration() {
    this.configurationSingletonService.getConfigurations().subscribe(
      data => {
        if (data != null) {
          this.configurationStorage.saveConfiguration(data);
          console.log(JSON.stringify(data));
        } else {
          this.presentAlert('Failed', '', 'Failed to get configuration');
        }
      },
      error => {
        this.presentAlert('Failed', '', 'Failed to get configuration');
      }
    );
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
