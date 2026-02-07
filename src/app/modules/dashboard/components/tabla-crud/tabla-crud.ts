import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardServices } from '../../services/dashboard-services';
import { ResponseInventoryDetails } from '../../interfaces/dashboard/responseInventoryDetails.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroInventario } from '../modal-registro-inventario/modal-registro-inventario';

@Component({
  selector: 'app-tabla-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-crud.html',
  styleUrl: './tabla-crud.css',
})
export class TablaCrud implements OnInit {

  listInventoryDetails = signal<ResponseInventoryDetails[]>([]);

  constructor(private dashboardService: DashboardServices, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

   openModal(): void {
    const dialogRef = this.dialog.open(ModalRegistroInventario, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ResponseInventoryDetails) => {
      if (result) {
        this.cargarDatos();
      }
    });
  }

  cargarDatos() {
    this.dashboardService.getInventoryDetail().subscribe({
      next: (response) => this.listInventoryDetails.set(response),
      error: () => this.listInventoryDetails.set([])
    });
  }
}
