import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreDetailCommentPageRoutingModule } from './my-store-detail-comment-routing.module';

import { MyStoreDetailCommentPage } from './my-store-detail-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreDetailCommentPageRoutingModule
  ],
  declarations: [MyStoreDetailCommentPage]
})
export class MyStoreDetailCommentPageModule {}
