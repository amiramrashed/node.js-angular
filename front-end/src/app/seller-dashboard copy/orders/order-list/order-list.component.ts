import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../../_services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  error: string | null = null;
  statusFilter = 'all';

  readonly ORDER_STATUSES = ['pending', 'shipped', 'completed', 'cancelled', 'returned'];

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
    private authService: AuthServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadSellerOrders();
  }

  private loadSellerOrders(): void {
    this.loading = true;
    const token = this.cookieService.get('token');
    
    if (!token) {
      this.error = 'No authentication token found';
      this.loading = false;
      return;
    }

    this.authService.decodeToken(token).pipe(
      switchMap(decodedToken => {
        if (!decodedToken) {
          throw new Error('Invalid token');
        }
        const sellerId = decodedToken.sub || decodedToken.id || decodedToken._id;
        console.log('Fetching orders for seller:', sellerId);
        
        return this.orderService.getAllOrders().pipe(
          tap(allOrders => {
            console.log(`Found ${allOrders.length} total orders`);
            
            // Deep inspect all orders to find any with this seller's products
            console.log('Examining each order for products with sellerId:', sellerId);
            
            allOrders.forEach((order, index) => {
              if (order.items && Array.isArray(order.items) && order.items.length > 0) {
                order.items.forEach((item, itemIndex) => {
                  // Log detailed structure for debugging
                  console.log(`Order ${index}, Item ${itemIndex} structure:`, JSON.stringify({
                    subInventoryId: typeof item.subInventoryId === 'object' ? 
                      {
                        _id: item.subInventoryId?._id,
                        product: item.subInventoryId?.product ? {
                          _id: item.subInventoryId.product._id,
                          sellerId: item.subInventoryId.product.sellerId
                        } : 'No product'
                      } : 'String ID',
                    product: typeof item.product === 'object' ? {
                      _id: item.product?._id,
                      sellerId: item.product?.sellerId
                    } : 'Not object',
                    sellerId: item.sellerId
                  }, null, 2));
                });
              }
            });
          }),
          map(orders => this.orderService.filterOrdersBySeller(orders, sellerId))
        );
      })
    ).subscribe({
      next: (filteredOrders) => {
        console.log(`Received ${filteredOrders.length} orders after filtering`);
        this.orders = filteredOrders;
        this.filteredOrders = filteredOrders;
        this.applyFilters();
      },
      error: (error) => {
        this.error = 'Failed to load orders';
        console.error('Error loading orders:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    if (this.statusFilter === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.statusFilter);
    }
  }

  getStatusButtonClass(status: string): string {
    const classes = {
      pending: 'btn-warning',
      shipped: 'btn-info',
      completed: 'btn-success',
      cancelled: 'btn-danger',
      returned: 'btn-secondary'
    };
    return classes[status as keyof typeof classes] || 'btn-light';
  }

  changeOrderStatus(order: Order, newStatus: string): void {
    if (order.status === newStatus) return;

    Swal.fire({
      title: 'Change Order Status',
      text: `Are you sure you want to change the status to ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.changeOrderStatus(order._id, newStatus).subscribe({
          next: (updatedOrder) => {
            const index = this.orders.findIndex(o => o._id === order._id);
            if (index !== -1) {
              this.orders[index] = updatedOrder;
              this.applyFilters();
            }
            Swal.fire('Updated!', 'Order status has been updated.', 'success');
          },
          error: (error) => {
            console.error('Error updating status:', error);
            Swal.fire('Error!', 'Failed to update order status.', 'error');
          }
        });
      }
    });
  }

  viewDetails(order: Order): void {
    const modalRef = this.modalService.open(OrderDetailsComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.order = order;
  }
}