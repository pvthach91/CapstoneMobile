import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreDetailPageRoutingModule } from './my-store-detail-routing.module';

import { MyStoreDetailPage } from './my-store-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreDetailPageRoutingModule
  ],
  declarations: [MyStoreDetailPage]
})
export class MyStoreDetailPageModule {}
