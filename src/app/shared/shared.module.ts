import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
