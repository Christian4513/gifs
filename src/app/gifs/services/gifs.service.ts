import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'uheOpEFOROI2BoaHlb88W7FkidGZjVrm';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultado: gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const storedHistorial = localStorage.getItem('historial');
      if (storedHistorial) {
        this._historial = JSON.parse(storedHistorial);
      }
    }

    if (typeof localStorage !== 'undefined') {
      const storedResultado = localStorage.getItem('resultado');
      if (storedResultado) {
        this.resultado = JSON.parse(storedResultado);
      }
    }
  }

  buscarGifs(query: string = '') {
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 12);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    const observable = this.http.get<SearchGifsResponse>(
      `${this.servicioUrl}/search`,
      { params: params }
    );
    observable.subscribe((resp) => {
      console.log(resp.data);
      this.resultado = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultado));
    });
  }
}
