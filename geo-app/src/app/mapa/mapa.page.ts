import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

declare var TomTom: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map: any;
  private tomTomAPIKey = 'SUA_CHAVE_DE_API_AQUI';

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = TomTom.L.map(this.mapElement.nativeElement, {
      key: this.tomTomAPIKey,
      source: 'vector',
      basePath: '/assets/tomtom-sdk',
      center: [0, 0], // Coordenadas iniciais do mapa
      zoom: 15, // Nível de zoom inicial
    });
  }

  searchPlace(placeName: string) {
    TomTom.services.fuzzySearch({
      key: this.tomTomAPIKey,
      query: placeName,
    }).go((result) => {
      if (result && result.results && result.results.length > 0) {
        const position = result.results[0].position;
        this.map.setView(position, 15);
        TomTom.L.marker(position).addTo(this.map);
      }
    });
  }
}
