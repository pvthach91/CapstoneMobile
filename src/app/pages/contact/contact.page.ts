import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  map;
  marker;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var mapOptions = {
      center:new google.maps.LatLng(14.665393, 121.012528),
      zoom:15
    };


    this.map = new google.maps.Map(document.getElementById("contact-location-map"),mapOptions);
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(14.665393, 121.012528),
      draggable:false,
      map: this.map,
    });
  }

}
