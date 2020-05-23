import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product.model";
import {Address} from "../../model/address.model";
import {configuration} from "../../model/configuration.model";
import {AlertController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {CartStorageService} from "../../services/cart-storage.service";
import {AddressService} from "../../services/address.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ConfigurationStorage} from "../../services/configuration-storage.service";
import {ProductService} from "../../services/product.service";
import {ProductCriteriaSearch} from "../../model/product-criteria-search.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  form: any = {};

  products:Array<Product> = new Array<Product>();
  subProducts:Array<Product> = new Array<Product>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  gridView = true;

  deliverAddress:Array<Address> = new Array<Address>();

  private configuration = configuration;

  constructor(public alertController: AlertController,
              private route: ActivatedRoute,
              private cartStorage: CartStorageService,
              private addressService: AddressService,
              private tokenStorage: TokenStorageService,
              private configurationStorage: ConfigurationStorage,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (this.tokenStorage.isLoggedIn()) {
          if (this.tokenStorage.hasBuyerRole()) {
            this.getAddresses();
          }
        } else {
        }

        this.search();
      });

  }

  getAddresses() {
    this.addressService.getAddressesForCurrentUser().subscribe(
      data => {
        if (data != null) {
          this.deliverAddress = data;
        } else {
          this.presentAlert('Error', '', 'Failed to get address');
        }
      },
      error => {
        this.presentAlert('Error', '', 'Failed to get address');
      }
    );
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

  search() {
    let price:string = this.form.price;
    let priceFrom = null;
    let priceTo = null;
    if (price != null || price != undefined) {
      let split = price.split(';');
      priceFrom = split[0];
      priceTo = split[1];
    }
    let selectedOnsale = this.form.onsale;
    let onsale = null;
    if (selectedOnsale == null || selectedOnsale == undefined || selectedOnsale == '') {
      onsale = null;
    } else if (selectedOnsale == 'true') {
      onsale = true;
    } else {
      onsale = false;
    }
    let criteria = new ProductCriteriaSearch(
      this.form.productName,
      this.generateCategories(),
      this.form.nearBy == null ? '': this.form.nearBy.state,
      priceFrom,
      priceTo,
      onsale,
      0);
    this.productService.getProducts(criteria).subscribe(
      data => {
        this.products = data;
        // this.currentPage = data.current;
        // this.totalPage = data.total;
        this.makePages();
        this.gotoPage(1);
      },
      error => {
        console.log(error);
      }
    );
  }

  generateCategories(): Array<string> {
    let category:Array<string> = new Array<string>();

    let checkPoultry = this.form.checkPoultry;
    if (checkPoultry == true) {
      category.push('Poultry');
    }

    let checkLivestock = this.form.checkLivestock;
    if (checkLivestock == true) {
      category.push('Livestock');
    }

    let checkAquatic = this.form.checkAquatic;
    if (checkAquatic == true) {
      category.push('Aquatic');
    }

    let checkVegetable = this.form.checkVegetable;
    if (checkVegetable == true) {
      category.push('Vegetable');
    }

    let checkFruit = this.form.checkFruit;
    if (checkFruit == true) {
      category.push('Fruit');
    }

    let checkOther = this.form.checkOther;
    if (checkOther == true) {
      category.push('Other');
    }

    return category;
  }

  makePages() {
    this.pages = new Array<number>();
    this.currentPage = 1;
    this.totalPage = 1;
    if (this.products.length % configuration.pageSize == 0) {
      this.totalPage = this.products.length / configuration.pageSize;
    } else {
      this.totalPage = this.products.length / configuration.pageSize + 1;
    }

    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.subProducts = new Array<Product>();
    this.currentPage = page;
    let start = configuration.pageSize * (this.currentPage - 1);
    // let end = configuration.pageSize;
    if (page == this.pages.length) {
      this.subProducts = this.products.slice(start);
    } else {
      this.subProducts = this.products.slice(start, start + configuration.pageSize);
    }
  }

  changeToListView() {
    this.gridView = false;
  }

  changeToGridView() {
    this.gridView = true;
  }

  addItemToCart(product: Product) {
    let added = this.cartStorage.addItem(product, 1);
    if (added) {
      this.presentAlert('Success', '', 'Added to cart successfully');
    }
  }


  searchFromHeader(productName: string) {
    this.form.productName = productName;
    this.search();
  }

}
