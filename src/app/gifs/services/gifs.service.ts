import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  // clave de api gif
  private apiKey: string = 'uheOpEFOROI2BoaHlb88W7FkidGZjVrm';
  // URL de api
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  // Array de historial de busqueda. Esta privado para que no se pueda modificar directamente.
  private _historial: string[] = [];
  // Array de resultado
  public resultado: gif[] = [];

  get historial() { // Copia de historial (encapsulación)
    return [...this._historial];
  }

  /* Verifica si el navegador soporta localStorage y, en caso afirmativo,
   recupera los datos almacenados bajo las claves 'historial' y 'resultado'.
   Si los datos existen, los convierte de nuevo a su formato original
   utilizando JSON.parse() y los asigna a las propiedades correspondientes.
*/
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

  /*
   Agrega una nueva búsqueda al historial si no está presente. Si la búsqueda no está en el historial,
   la agrega al principio del arreglo `_historial`, limitando el historial a las últimas 10 búsquedas.
   Luego, actualiza el historial en el localStorage para persistir los cambios.
*/
  buscarGifs(query: string = '') {
    if (!this._historial.includes(query)) {
      this._historial.unshift(query); // Agrega la nueva búsqueda al inicio del historial
      this._historial = this._historial.splice(0, 10); // Limita el historial a 10 elementos
      localStorage.setItem('historial', JSON.stringify(this._historial)); // Guarda el historial actualizado en localStorage
    }

    /*
   Crea un objeto HttpParams que contiene los parámetros de la solicitud HTTP.
   Este enfoque es más escalable y limpio, ya que permite agregar fácilmente nuevos parámetros
   en el futuro sin modificar la estructura del código.
   - 'api_key': La clave de API que autentica la solicitud.
   - 'limit': El número máximo de resultados a obtener (en este caso, 12).
   - 'q': El término de búsqueda (query) que se utiliza en la consulta.
*/
    const params = new HttpParams()
      .set('api_key', this.apiKey) // Establece la clave de API para autenticar la solicitud
      .set('limit', '12') // Establece el límite de resultados (12)
      .set('q', query); // Establece el término de búsqueda proporcionado

    /*
   Realiza una solicitud HTTP GET para obtener los resultados de búsqueda de gifs.
   Utiliza los parámetros definidos previamente (`params`) para personalizar la consulta.
   Una vez obtenidos los datos, se actualiza la propiedad `resultado` con la respuesta
   y se guarda la información en `localStorage` para persistirla entre sesiones.
*/
    const observable = this.http.get<SearchGifsResponse>(
      `${this.servicioUrl}/search`, // URL del servicio para buscar gifs
      { params: params } // Parámetros de la solicitud (api_key, limit, q)
    );

    observable.subscribe((resp) => {
      this.resultado = resp.data; // Asigna los resultados de la respuesta a la propiedad 'resultado'
      localStorage.setItem('resultado', JSON.stringify(this.resultado)); // Guarda los resultados en 'localStorage'
    });
  }
}
