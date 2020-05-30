import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailCommentPageRoutingModule } from './product-detail-comment-routing.module';

import { ProductDetailCommentPage } from './product-detail-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailCommentPageRoutingModule
  ],
  declarations: [ProductDetailCommentPage]
})
export class ProductDetailCommentPageModule {}
