import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {Rate} from "../../../../model/rate.model";
import {ProductDetail} from "../../../../model/productdetail.model";
import {AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../../../services/file-upload.service";
import {FarmerService} from "../../../../services/farmer.service";
import {CommentService} from "../../../../services/comment.service";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-my-store-detail-rate',
  templateUrl: './my-store-detail-rate.page.html',
  styleUrls: ['./my-store-detail-rate.page.scss'],
})
export class MyStoreDetailRatePage implements OnInit {

  form: any = {};
  id;

  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  // comments: Array<Comment> = new Array<Comment>();
  rates: Array<Rate> = new Array<Rate>();
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  averageRates;
  oneStar; twoStar; threeStar; fourStar; fiveStar;
  myRate: Rate = new Rate(null, 0, null, null);

  constructor(public alertController: AlertController,
              private route: ActivatedRoute,
              private router: Router,
              private fileUploadService: FileUploadService,
              private farmService: FarmerService,
              public commentService: CommentService,
              private tokenStorage: TokenStorageService,
              private productService: ProductService) { }

  ngOnInit() {
    // this.getFarmAddress();
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
    this.productService.getProduct(this.id).subscribe(
      data => {
        if (data.success) {
          this.productDetail = data.data;
          // this.dto = this.productDetail.dto;
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
    });
    if (this.rates.length ==0 ) {
      this.averageRates = 0;
    } else {
      this.averageRates = sumRate/this.rates.length;
    }

  }
}
