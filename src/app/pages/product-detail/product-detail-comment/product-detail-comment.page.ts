import {Component, OnInit} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {Product} from "../../../model/product.model";
import {Comment} from "../../../model/comment.model";
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
  selector: 'app-product-detail-comment',
  templateUrl: './product-detail-comment.page.html',
  styleUrls: ['./product-detail-comment.page.scss'],
})
export class ProductDetailCommentPage implements OnInit {

  id;
  private configuration = configuration;

  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  comments: Array<Comment> = new Array<Comment>();
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  myComment: string = '';

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
    this.productService.getProduct(this.id).subscribe(
      data => {
        if (data.success) {
          this.productDetail = data.data;
          this.dto = this.productDetail.dto;
          this.comments = this.productDetail.comments;
          this.myComment = '';
        } else {
          this.presentAlert('Error', '', data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  async commentProduct() {
    if (this.myComment.length <= 0) {
      this.presentAlert('Warning', '', "Please enter your comment!");
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure to submit the comment',
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
              let c = new Comment(null,this.myComment, null, null);
              this.commentService.addComment(this.id, c).subscribe(
                data => {
                  if (data != null) {
                    this.comments = data;
                    this.myComment = '';
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
}
