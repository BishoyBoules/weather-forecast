import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {
  public position: any;

  constructor(private http: HttpClient) { }

  getLocation() {
    let status = "";
    let mapLink = "";

    function success(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      console.log(mapLink);
    }
    function error() {
      status = 'Unable to retrieve your location';
    }
    if (!navigator.geolocation) {
      status = 'Geolocation is not supported by your browser';
      console.log(status)
    } else {
      status = 'Locating…';
      console.log(status)
      console.log(navigator.geolocation.getCurrentPosition(success, error))
      return navigator.geolocation.getCurrentPosition(success, error);
    }
  }


}
