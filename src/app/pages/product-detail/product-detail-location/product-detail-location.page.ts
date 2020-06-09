import { Component, OnInit } from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {Product} from "../../../model/product.model";
import {Comment} from "../../../model/comment.model";
import {Rate} from "../../../model/rate.model";
import {ProductDetail} from "../../../model/productdetail.model";
import {Farm} from "../../../model/farm.model";
import {ProductService} from "../../../services/product.service";
import {AlertController} from "@ionic/angular";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {RateService} from "../../../services/rate.service";
import {FarmerService} from "../../../services/farmer.service";
import {CommentService} from "../../../services/comment.service";
import {CartStorageService} from "../../../services/cart-storage.service";
import {ActivatedRoute} from "@angular/router";

declare const google: any;

@Component({
  selector: 'app-product-detail-location',
  templateUrl: './product-detail-location.page.html',
  styleUrls: ['./product-detail-location.page.scss'],
})
export class ProductDetailLocationPage implements OnInit {

  id;
  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  lat = 14.665393;
  lng = 121.012528;
  map;

  constructor(private productService: ProductService,
              public alertController: AlertController,
              private tokenStorage: TokenStorageService,
              public rateService: RateService,
              private farmService: FarmerService,
              public commentService: CommentService,
              private cartStorage: CartStorageService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
      } else {
        // Load detail page
        this.getCurrentProduct();
      }
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

  getCurrentProduct() {
    this.productService.getProductForGuest(this.id).subscribe(
      data => {
        if (data.success) {
          this.productDetail = data.data;
          this.dto = this.productDetail.dto;
          this.lat = this.dto.user.latitude;
          this.lng = this.dto.user.longitude;
          this.initMap();
        } else {
          this.presentAlert('Error', '', data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  initMap() {
    var mapOptions = {
      center:new google.maps.LatLng(this.lat, this.lng),
      zoom:15
    };

    this.map = new google.maps.Map(document.getElementById("product-detail-location-map"),mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      // draggable:true,
      map: this.map,
    });
  }
}
