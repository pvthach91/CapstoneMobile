import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclePage } from './vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: VehiclePage
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./vehicle-manage/vehicle-manage.module').then( m => m.VehicleManagePageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./vehicle-manage/vehicle-manage.module').then( m => m.VehicleManagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclePageRoutingModule {}
