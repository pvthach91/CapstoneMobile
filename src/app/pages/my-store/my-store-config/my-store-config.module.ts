import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreConfigPageRoutingModule } from './my-store-config-routing.module';

import { MyStoreConfigPage } from './my-store-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreConfigPageRoutingModule
  ],
  declarations: [MyStoreConfigPage]
})
export class MyStoreConfigPageModule {}
