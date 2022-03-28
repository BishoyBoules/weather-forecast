import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as L from "leaflet";
// import * as d3 from "d3";
import { ApixuService } from "../apixu.service";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  public weatherData: any;
  public myLocation: any;
  public id = "#map";

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService,
  ) { }

  watchPosition() {
    navigator.geolocation.watchPosition(position => {
      let container = L.DomUtil.get('#map');
      if (container != null) {
        container = null;
      }
      let myMap = new L.Map('map', {
        center: new L.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 6,
      });
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYm9zaGJvc2giLCJhIjoiY2wxOWdnand4MG5oZjNibW05b2ZrYmFsaSJ9.G_ICikMRlp6W3LDz1eysYw`,
        {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token'
        }).addTo(myMap);
      let marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap);
      marker.bindPopup('<b>This is my location</b>').openPopup();
    }, err => {
      alert(err)
    }, {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    })

  }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: []
    });
    if (!navigator.geolocation) {
      console.log("geolocation is not supported on your device")
    }
    this.watchPosition();
  }

  sendToAPIXU(formValues: any) {
    this.apixuService.getWeather(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(data);
      console.log(navigator);
    });
  }
}