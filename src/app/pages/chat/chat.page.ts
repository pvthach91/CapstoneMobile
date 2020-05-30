import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController} from "@ionic/angular";
import {ChatService} from "../../services/chat.service";
import {User} from "../../model/user.model";
import {configuration} from "../../model/configuration.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  loading;

  users:Array<User> = new Array<User>();

  configuration = configuration;

  constructor(public loadingController: LoadingController,
              private chatService: ChatService,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getContacts();
    });
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

  getContacts() {
    this.chatService.getChatContact().subscribe(
      data => {
        if (data != null) {
          this.users = data;
        } else {
          this.presentAlert('Error', '', 'Failed to gt message');
        }
      },
      error => {
        console.log(error);
        this.presentAlert('Error', '', error.toString());
      }
    );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();
  }

  async test() {
    this.presentLoading();
    await this.delay(1000);
    this.dismiss();
  }

  async dismiss() {
    await this.loading.dismiss();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
