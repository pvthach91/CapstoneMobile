import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleManagePageRoutingModule } from './vehicle-manage-routing.module';

import { VehicleManagePage } from './vehicle-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleManagePageRoutingModule
  ],
  declarations: [VehicleManagePage]
})
export class VehicleManagePageModule {}
