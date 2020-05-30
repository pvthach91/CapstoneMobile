import {Component, OnInit} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {Product} from "../../../model/product.model";
import {Rate} from "../../../model/rate.model";
import {ProductDetail} from "../../../model/productdetail.model";
import {ProductService} from "../../../services/product.service";
import {AlertController} from "@ionic/angular";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {RateService} from "../../../services/rate.service";
import {FarmerService} from "../../../services/farmer.service";
import {CommentService} from "../../../services/comment.service";
import {CartStorageService} from "../../../services/cart-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail-rate',
  templateUrl: './product-detail-rate.page.html',
  styleUrls: ['./product-detail-rate.page.scss'],
})
export class ProductDetailRatePage implements OnInit {

  id;
  private configuration = configuration;

  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  rates: Array<Rate> = new Array<Rate>();
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  averageRates;
  oneStar; twoStar; threeStar; fourStar; fiveStar;
  myRate: Rate = new Rate(null, 0, null, null);


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

  calculaterates() {
    let sumRate = 0;
    this.oneStar = 0;
    this.twoStar = 0;
    this.threeStar = 0;
    this.fourStar = 0;
    this.fiveStar = 0;
    this.myRate = new Rate(null, 0, null, null);
    this.rates.forEach((rate, index) => {
      sumRate += rate.star;

      if (rate.star == 1) {
        this.oneStar ++;
      } else if (rate.star == 2) {
        this.twoStar ++;
      } else if (rate.star == 3) {
        this.threeStar ++;
      } else if (rate.star == 4) {
        this.fourStar ++;
      } else if (rate.star == 5) {
        this.fiveStar ++;
      }

      if (rate.ratedBy.username == this.tokenStorage.getUsername()) {
        this.myRate = rate;
      }
    });

    this.averageRates = sumRate/this.rates.length;
  }

  getCurrentProduct() {
    this.productService.getProduct(this.id).subscribe(
      data => {
        if (data.success) {
          this.productDetail = data.data;
          this.dto = this.productDetail.dto;
          this.rates = this.productDetail.rates;
          this.calculaterates();
        } else {
          this.presentAlert('Error', '', data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  async rateProduct(star: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to rate this product as ' + star + ' star?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            let rate = this.myRate;
            rate.star = star;
            this.rateService.addRate(this.id, rate).subscribe(
              data => {
                if (data != null) {
                  this.rates = data;
                  this.calculaterates();
                } else {
                  this.presentAlert('Error', '', 'Failed to rate the product');
                }
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
