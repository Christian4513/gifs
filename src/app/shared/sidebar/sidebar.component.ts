import { CommonModule } from '@angular/common';
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
    return this.gifsService.historial;
  }
}
