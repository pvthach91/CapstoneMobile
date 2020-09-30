import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app-tab',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'about',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  {
    path: 'support',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: 'signup',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
      }
    ]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'confirmation/:id',
    loadChildren: () => import('./pages/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'products/detail/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'deliver-address',
    loadChildren: () => import('./pages/deliver-address/deliver-address.module').then( m => m.DeliverAddressPageModule)
  },
  {
    path: 'farm',
    loadChildren: () => import('./pages/farm/farm.module').then( m => m.FarmPageModule)
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./pages/vehicle/vehicle.module').then( m => m.VehiclePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: '',
    redirectTo: '/app-tab/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
