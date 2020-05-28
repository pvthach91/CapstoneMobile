import { Component, OnInit } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  loading;

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {
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
