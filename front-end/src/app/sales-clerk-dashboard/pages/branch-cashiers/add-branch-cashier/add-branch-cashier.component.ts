import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-branch-cashier',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal" [class.show]="show" [style.display]="show ? 'block' : 'none'" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Cashier</h5>
            <button type="button" class="btn-close" (click)="close.emit()"></button>
          </div>
          <div class="modal-body">
            <p>Form would go here in a real implementation</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close.emit()">Cancel</button>
            <button type="button" class="btn btn-primary" (click)="saved.emit()">Save Cashier</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="show"></div>
  `,
  styles: [`
    .modal-backdrop { opacity: 0.5; }
  `]
})
export class AddBranchCashierComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
}