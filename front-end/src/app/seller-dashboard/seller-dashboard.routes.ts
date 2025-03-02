import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { SalesChartComponent } from './analytics/sales-chart/sales-chart.component';
import { SellerDashboardComponent } from './seller-dashboard.component';

export const SELLER_DASHBOARD_ROUTES: Routes = [
  {path:'',component:SellerDashboardComponent,children:[
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'sales', component: SalesChartComponent }
  ]}
];