import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { SharedModule } from './shared/shared.module';
import { GifsModule } from "./gifs/gifs.module";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, GifsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gifsApp';
  isCollapsed: boolean = true;
}
