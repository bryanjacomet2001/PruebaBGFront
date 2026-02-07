import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardServices } from '../../services/dashboard-services';
import { ResponseProductInfo } from '../../../productos/interfaces/responseProductInfo.interface';
import { ResponseProvidersInfo } from '../../../proveedores/interfaces/response.providersInfo.interface';
import { RequestCreatebatch } from '../../../productos/interfaces/requestCreatebatch.interface';
import { SweetAlertService } from '../../../../shared/services/SweetAlertService';

@Component({
  selector: 'app-modal-registro-inventario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './modal-registro-inventario.html',
  styleUrl: './modal-registro-inventario.css',
})
export class ModalRegistroInventario implements OnInit {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ModalRegistroInventario>);
  private dashboardServices = inject(DashboardServices);
  private sweetAlertService = inject(SweetAlertService);

  public inventoryForm!: FormGroup;

  productList = signal<ResponseProductInfo[]>([]);
  providersList = signal<ResponseProvidersInfo[]>([]);

  ngOnInit(): void {
  this.loadProducts();
  this.loadProviders();

  this.inventoryForm = this.fb.group({
    productoId: ['', [Validators.required]],
    proveedorId: ['', [Validators.required]],
    precio: [null, [Validators.required, Validators.min(0.01)]],
    stock: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    lote: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
  });
}

  isInvalid(field: string): boolean {
    const control = this.inventoryForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
  if (this.inventoryForm.valid) {
    const request: RequestCreatebatch = {
      productoId: this.inventoryForm.value.productoId,
      proveedorId: this.inventoryForm.value.proveedorId,
      precio: this.inventoryForm.value.precio,
      numeroLote: this.inventoryForm.value.lote,
      stock: this.inventoryForm.value.stock,
    };

    this.dashboardServices.createNewBatch(request).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
        error: () => {
          this.sweetAlertService.error("Ocurrio un error al momento de registrar el nuevo registro");
        }
      });
      } else {
        this.inventoryForm.markAllAsTouched();
      }
    }

  onClose(): void {
    this.dialogRef.close();
  }

  loadProducts(){
    this.dashboardServices.getProductsList().subscribe({
      next: (Response) => this.productList.set(Response),
      error: ()=> []
    });
  }

    loadProviders(){
    this.dashboardServices.getProvidersList().subscribe({
      next: (Response) => this.providersList.set(Response),
      error: ()=> []
    });
  }

}
