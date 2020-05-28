import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {Comment} from "../../../../model/comment.model";
import {ProductDetail} from "../../../../model/productdetail.model";
import {AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../../../services/file-upload.service";
import {FarmerService} from "../../../../services/farmer.service";
import {CommentService} from "../../../../services/comment.service";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-my-store-detail-comment',
  templateUrl: './my-store-detail-comment.page.html',
  styleUrls: ['./my-store-detail-comment.page.scss'],
})
export class MyStoreDetailCommentPage implements OnInit {

  form: any = {};
  id;
  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  comments: Array<Comment> = new Array<Comment>();
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  myComment: string = '';

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
