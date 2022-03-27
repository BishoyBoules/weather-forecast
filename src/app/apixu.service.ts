import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=fb07a3a85e610283b3236c13adb7ae2a&units=metric";

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    return this.http.get(
      url + location + key
    );
  }


}