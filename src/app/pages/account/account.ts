import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertController} from '@ionic/angular';
import {User} from "../../model/user.model";
import {AdminService} from "../../services/admin.service";
import {FileUploadService} from "../../services/file-upload.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {configuration} from "../../model/configuration.model";


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  username: string;

  user: User = new User();
  profilePhoto:string = 'assets/images/no-photo.jpg';

  uploadActive = false;

  selectedFile: File;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private fileUploadService: FileUploadService,
              public alertController: AlertController,
              private tokenStorage: TokenStorageService) { }

  ngAfterViewInit() {
    if (!this.tokenStorage.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;
    }
    this.route.params.subscribe(
      params => {
        this.getCurrentUser();
      });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/login');
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

  getCurrentUser() {
    this.adminService.getCurrentUser().subscribe(
      data => {
        this.user = data;
        if (data.photo != undefined && data.photo != null && data.photo.length > 0) {
          this.profilePhoto = configuration.host + "/api/guest/file/" +data.photo;
        }
      },
      error => {
      }
    );
  }

  onFileChanged(event: any): void {
    let files = event.target.files;
    if (files != null) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }
  }

  updatePhoto(user: User) {
    this.adminService.changePhoto(user).subscribe(
      data => {
        this.user = data;
        if (data.photo != undefined && data.photo != null) {
          this.profilePhoto = configuration.host + "/api/guest/file/" +data.photo;
        }
        this.uploadActive = false;
      },
      error => {
        console.log(error);
        this.presentAlert('Failed', '', 'Failed to register');
      }
    );
  }

  uploadPhoto() {
    if (this.selectedFile != null) {
      console.log(this.selectedFile);
      this.fileUploadService.uploadProfilePhoto(this.selectedFile).subscribe(
        data => {
          if (data.success) {
            let user = this.user;
            user.photo = data.data;
            this.updatePhoto(user);
          }
        },
        error => {
          this.presentAlert('Failed', '', 'Failed to upload photo');
        }
      );
    } else {
      this.presentAlert('Warning', '', 'Please select photo');
    }

  }

  openUploadSection() {
    this.uploadActive = true;
  }
  cancelUpload() {
    this.uploadActive = false;
    this.selectedFile = null;
  }
}
