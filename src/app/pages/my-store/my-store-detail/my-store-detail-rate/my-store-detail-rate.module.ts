import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreDetailRatePageRoutingModule } from './my-store-detail-rate-routing.module';

import { MyStoreDetailRatePage } from './my-store-detail-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreDetailRatePageRoutingModule
  ],
  declarations: [MyStoreDetailRatePage]
})
export class MyStoreDetailRatePageModule {}
