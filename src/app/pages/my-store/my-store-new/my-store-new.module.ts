import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreNewPageRoutingModule } from './my-store-new-routing.module';

import { MyStoreNewPage } from './my-store-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreNewPageRoutingModule
  ],
  declarations: [MyStoreNewPage]
})
export class MyStoreNewPageModule {}
