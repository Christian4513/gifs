import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  title: string = 'Gifs App';

  constructor(private gifsService: GifsService) {}

  get historial() {
    // Copia de historial (encapsulación)
    return this.gifsService.historial;
  }

  /*
   Realiza la petición de búsqueda de gifs utilizando el servicio `gifsService`.
   Toma el término de búsqueda `ultimaBusqueda` y lo pasa al método `buscarGifs`
   para ejecutar la búsqueda y obtener los resultados correspondientes.
*/
  buscar(ultimaBusqueda: string) {
    this.gifsService.buscarGifs(ultimaBusqueda);
  }
}
