import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Footer, Header, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { HeaderComponent } from "./admin-dashboard/core/header/header.component";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
@Component({
  selector: 'app-root',
  // standalone: true,
//   imports: [
//     RouterOutlet,
//     FooterComponent,
//     ToastModule,
//     CommonModule,
//     AdminDashboardComponent,
//     HeaderComponent
// ],
imports: [
  RouterOutlet,FooterComponent,HeaderComponent,NotFoundComponent
  //,ProductDetailsComponent
  // NotFoundComponent,AboutComponent,ContactUsComponent,HomeComponent,ProductDetailsComponent,
  // FooterComponent,HeaderComponent,CatalogComponent

],
templateUrl: './app.component.html',

  providers: [MessageService],
  styles: []
})
export class AppComponent {
  title = 'E-commerce App';
}