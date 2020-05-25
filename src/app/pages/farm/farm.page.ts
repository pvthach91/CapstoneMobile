import { Component, OnInit } from '@angular/core';
import {Farm} from "../../model/farm.model";
import {configuration} from '../../model/configuration.model';
import {TokenStorageService} from "../../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FarmerService} from "../../services/farmer.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-farm',
  templateUrl: './farm.page.html',
  styleUrls: ['./farm.page.scss'],
})
export class FarmPage implements OnInit {

  farms: Array<Farm> = new Array<Farm>();

  private configuration = configuration;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private farmService: FarmerService,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    if (!this.tokenStorage.hasFarmerRole()) {
      this.router.navigate(['/home']);
    }
    this.route.params.subscribe(
      params => {
        this.search();
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

  search() {
    this.farmService.getFarmsForCurrentUser().subscribe(
      data => {
        this.farms = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
