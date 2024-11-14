import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

// Hace una copia del array gif para hacer el for en el html
  get resultados(){
    return this.gifsService.resultado;
  }

  constructor(private gifsService: GifsService){}

// copia el enlace en portapapeles
  copiarEnlace(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
    });
  }

}


