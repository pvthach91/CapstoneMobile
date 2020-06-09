import {Component, OnInit, ViewChild} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {Product} from "../../../model/product.model";
import {ProductDetail} from "../../../model/productdetail.model";
import {Farm} from "../../../model/farm.model";
import {ProductService} from "../../../services/product.service";
import {AlertController, IonSlides} from "@ionic/angular";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {RateService} from "../../../services/rate.service";
import {FarmerService} from "../../../services/farmer.service";
import {CommentService} from "../../../services/comment.service";
import {CartStorageService} from "../../../services/cart-storage.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-product-detail-farm',
  templateUrl: './product-detail-farm.page.html',
  styleUrls: ['./product-detail-farm.page.scss'],
})
export class ProductDetailFarmPage implements OnInit {

  @ViewChild('farmSlider', null) slider: IonSlides;

  id;
  private configuration = configuration;

  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);


  farms: Array<Farm> = new Array<Farm>();
  farmMap: Map<number, Farm> = new Map<number, Farm>();
  aboutAuthorCurrentFarm: Farm = new Farm(null,'', '', [], 0, 0);
  aboutAuthorCurrentFarmPhoto;

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
          this.getFarms();
        } else {
          this.presentAlert('Error', '', data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getFarms() {
    this.farmMap = new Map<number, Farm>();
    this.farmService.getFarms(this.dto.user.id).subscribe(
      data => {
        this.farms = data;
        this.farms.forEach((farm, index) => {
          this.farmMap.set(farm.id, farm);
        });
        this.aboutAuthorCurrentFarm = this.farms[0];
        this.aboutAuthorCurrentFarmPhoto = configuration.host + '/api/guest/file/' + this.farms[0].images[0];
      },
      error => {
        console.log(error);
      }
    );
  }

  changeAboutFarmerPhotoView(src: string) {
    this.aboutAuthorCurrentFarmPhoto = configuration.host + '/api/guest/file/' + src;
  }

  changeAboutFarmerFarm(farmId: number) {
    this.aboutAuthorCurrentFarm = this.farmMap.get(farmId);
    this.slider.slideTo(0);
    this.aboutAuthorCurrentFarmPhoto = configuration.host + '/api/guest/file/' + this.aboutAuthorCurrentFarm.images[0];
  }

}
