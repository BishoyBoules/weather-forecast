import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=fb07a3a85e610283b3236c13adb7ae2a&units=metric";

const WWO = "https://www.worldweatheronline.com/developer/my/analytics.aspx?key_id=c91d63ef9b404583a0e111712222103&q=";
//const movie = "https://api.themoviedb.org/3/trending/movie/week?api_key=565c9047921c30ff2b3f3c7e5fa064e9%27";
const email = "biso_quarezma@yahoo.com";
const pwd = "12345678";

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