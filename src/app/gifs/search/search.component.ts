import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private gifsService: GifsService) {}
// toma el imput como referencia paa poder capturar el valor
  @ViewChild("txtBuscar") txtBuscar!: ElementRef<HTMLInputElement>;

  /* captura el valor, hace la validación de contenido y envia valor de busqueda al servicio,
  luego realiza reset de input.*/
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if (!valor.trim().length) return;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
