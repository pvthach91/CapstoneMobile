import { Component, OnInit } from '@angular/core';
import {State} from "../../../model/state.model";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FarmerService} from "../../../services/farmer.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {ConfigurationStorage} from "../../../services/configuration-storage.service";
import {AlertController} from "@ionic/angular";
import {Farm} from "../../../model/farm.model";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {Camera} from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-farm-new',
  templateUrl: './farm-new.page.html',
  styleUrls: ['./farm-new.page.scss'],
})
export class FarmNewPage implements OnInit {

  id;
  form: any = {};
  states: Array<State> =new Array<State>();

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  displayOldImages = false;

  joinImagesText: Array<string>;

  // lat = 14.665393;
  // lng = 121.012528;
  // marker;
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
      // this.lat = 14.665393;
      // this.lng = 121.012528;
      // this.getCurrentLocation();
      // this.states = this.configurationStorage.getStateList();
      // this.form.state = this.states[0].name;
      // this.form.address = '';
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

//Creating farm

  // getCurrentLocation() {
  //     if (navigator.geolocation) {
  //         let current = this;
  //         navigator.geolocation.getCurrentPosition(function(position) {
  //             console.log('show location: ' + position.coords.latitude);
  //             current.lat =position.coords.latitude;
  //             current.lng =position.coords.longitude;
  //             current.initMap();
  //         }, function() {
  //         });
  //     } else {
  //         console.log('Browser doesnt support Geolocation');
  //     }
  // }


  // initMap() {
  //     var mapOptions = {
  //         center:new google.maps.LatLng(this.lat, this.lng),
  //         zoom:15
  //     };
  //
  //     this.map = new google.maps.Map(document.getElementById("farm-detail-location-map"),mapOptions);
  //     this.marker = new google.maps.Marker({
  //         position: new google.maps.LatLng(this.lat, this.lng),
  //         draggable:true,
  //         map: this.map,
  //     });
  // }

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


  postFarm() {
    let farm = new Farm(
      null,
      this.form.state,
      this.form.address,
      this.joinImagesText,
      0,
      0);
    this.farmService.addFarm(farm).subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/farm/view/' + data.data.id]);
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
    }
  }

}
