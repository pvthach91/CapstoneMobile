import { Component, OnInit } from '@angular/core';
import {State} from "../../../model/state.model";
import {Farm} from "../../../model/farm.model";
import {configuration} from '../../../model/configuration.model';
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FarmerService} from "../../../services/farmer.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {ConfigurationStorage} from "../../../services/configuration-storage.service";
import {AlertController} from "@ionic/angular";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {Camera} from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-farm-view',
  templateUrl: './farm-view.page.html',
  styleUrls: ['./farm-view.page.scss'],
})
export class FarmViewPage implements OnInit {

  id;
  form: any = {};
  savedCurrentPhoto;
  states: Array<State> =new Array<State>();

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  oldImagesMap: Map<number, string> = new Map<number, string>();
  displayOldImages = false;

  currentFarm: Farm = new Farm(null, '', '', [], 0, 0);

  joinImagesText: Array<string>;

  private configuration = configuration;

  // lat = 14.665393;
  // lng = 121.012528;
  //
  //
  // map;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private farmService: FarmerService,
              private fileUploadService: FileUploadService,
              private configurationStorage: ConfigurationStorage,
              private imagePicker: ImagePicker,
              private camera: Camera,
              public alertController: AlertController) { }

  ngOnInit() {
    if (!this.tokenStorage.hasFarmerRole()) {
      this.router.navigate(['/home']);
      return;
    }

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load error page
      } else {
        // Load detail page
        console.log('.........................init farm');
        // this.initMap();
        this.getCurrentFarm();
        this.states = this.configurationStorage.getStateList();
      }
    });
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

  getCurrentFarm() {
    this.farmService.getFarm(this.id).subscribe(
      data => {
        if (data.success) {
          this.currentFarm = data.data;
          this.initData();
          // this.initMap();
        } else {
          this.presentAlert('Error', '', data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  initData() {
    this.displayOldImages = true;
    this.currentFarm.images.forEach((url, i) => {
      this.oldImagesMap.set(i, url);
    });
    this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.currentFarm.images[0];
    this.form.id = this.currentFarm.id;
    this.form.address = this.currentFarm.address;
    this.form.state = this.currentFarm.state;
  }

//Creating farm
//   initMap() {
//     var mapOptions = {
//       center:new google.maps.LatLng(this.currentFarm.latitude, this.currentFarm.longitude),
//       zoom:15
//     };
//
//     console.log('init map: ' + this.currentFarm.latitude + ", " + this.currentFarm.longitude);
//
//     this.map = new google.maps.Map(document.getElementById("farm-detail-location-map"),mapOptions);
//     var marker = new google.maps.Marker({
//       position: new google.maps.LatLng(this.currentFarm.latitude, this.currentFarm.longitude),
//       // draggable:true,
//       map: this.map,
//     });
//   }

  changePhotoView(src: string) {
    this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + src;
  }

  onFileChanged(event: any): void {
    let files = event.target.files;
    if (files != null && files.length > 0) {
      this.displayOldImages = false;
      this.imagesMap = new Map<number, File>();
      let index = 0;
      for (let file of files) {
        if (index >= 3) break;
        this.imagesMap.set(index, file);
        index++;
      }
      this.makeDisplayImages();
    }
  }

  onImagePicker() {
    const options = {
      maximumImagesCount: 3,
      width: 800,
      height: 800,
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      outputType: 1 //Set output type to 1 to get base64img
    };

    this.imagePicker.getPictures(options).then((results) => {
        if (results != null && results.length > 0) {
          let today = new Date();
          let name = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate() + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
          this.displayOldImages = false;
          this.imagesMap = new Map<number, File>();
          for (var i = 0; i < results.length; i++) {
            if (i >= 3) break;
            console.log('Image URI: ' + results[i]);
            // alert('Image URI: ' + results[i]);
            let blob = this.getBlob(results[i], ".jpg");
            let file = new File([blob], name + "_"+ i + ".jpg");

            this.imagesMap.set(i, file);
          }
          this.makeDisplayImages();
        }
        // var files: File[] = [];
        // for (var i = 0; i < results.length; i++) {
        //   console.log('Image URI: ' + results[i]);
        //   alert('Image URI: ' + results[i]);
        //   let blob = this.getBlob(results[i], ".jpg");
        //   const file = new File([blob], "image.jpg");
        //   files.push(file);
        // }
      }
      ,(err) => { });
  }

  private getBlob(b64Data:string, contentType:string, sliceSize:number= 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  makeDisplayImages(): void {
    this.displayImagesMap = new Map<number, string>();
    this.imagesMap.forEach((file, index) => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.displayImages.push(e.target.result);
        this.displayImagesMap.set(index, e.target.result);
      }
      reader.readAsDataURL(file);
    });
  }

  getSelectedFiles(): void {
    this.selectedFile = new Array<File>();
    this.imagesMap.forEach((file, index) => {
      this.selectedFile.push(file);
    });
  }

  getOldImageUrl(): Array<string> {
    let result = new Array<string>();
    this.oldImagesMap.forEach((url, index) => {
      result.push(url);
    });

    return result;
  }

  updateFarmPhoto() {
    let requestFarm = this.currentFarm;
    requestFarm.images = this.joinImagesText;
    this.farmService.changeFarmPhoto(requestFarm).subscribe(
      data => {
        if (data != null) {
          this.currentFarm = data.data;
          this.displayOldImages = true;
          this.currentFarm.images.forEach((url, i) => {
            this.oldImagesMap.set(i, url);
          });
          this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.currentFarm.images[0];
        } else {
          this.presentAlert('Error', '', 'Failed to create farm');
        }
      },
      error => {
        this.presentAlert('Error', '', 'Failed to create farm');
      }
    );
  }

  cancelUpload() {
    this.displayOldImages = true;
    this.selectedFile = [];
  }

  uploadFarmPhoto() {
    if (!this.displayOldImages) {
      this.getSelectedFiles();
      if (this.selectedFile.length > 0) {
        this.fileUploadService.uploadFarmPhoto(this.selectedFile).subscribe(
          data => {
            this.joinImagesText = data;
            this.updateFarmPhoto();
          },
          error => {
            this.presentAlert('Error', '', 'Failed to upload files');
          }
        );
      } else {
        this.presentAlert('Warning', '', 'Please upload your farm pictures');
      }
    }
  }


  postFarm() {
    let requestFarm = this.currentFarm;
    requestFarm.images = this.joinImagesText;
    requestFarm.state = this.form.state;
    requestFarm.address = this.form.address;
    this.farmService.addFarm(requestFarm).subscribe(
      data => {
        if (data != null) {
          this.presentAlert('Success', '', 'Update successfully');
          this.currentFarm = data.data;
          this.initData();
        } else {
          this.presentAlert('Error', '', 'Failed to create farm');
        }
      },
      error => {
        this.presentAlert('Error', '', 'Failed to create farm');
      }
    );
  }

  onSubmit() {
    if (!this.displayOldImages) {
      this.getSelectedFiles();
      if (this.selectedFile.length > 0) {
        this.fileUploadService.uploadFarmPhoto(this.selectedFile).subscribe(
          data => {
            this.joinImagesText = data;
            this.postFarm();
          },
          error => {
            this.presentAlert('Error', '', 'Failed to upload files');
          }
        );
      } else {
        this.presentAlert('Warning', '', 'Please upload your farm pictures');
      }
    } else {
      this.joinImagesText = this.currentFarm.images;
      this.postFarm();
    }
  }

}
