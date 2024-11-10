import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gifsApp';
  isCollapsed: boolean = true;
}
