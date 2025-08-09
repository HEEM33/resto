import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { AddmenuComponent } from '../addmenu/addmenu.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TableService } from '../services/table.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant',
  imports: [CommonModule, MatInputModule, MatCheckboxModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatTableModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
   @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
    selectedSection: string = 'menu'; 
    private dialog = inject(MatDialog);
    private tableService = inject(TableService);
   
  
    displayedTableColumns: string[] = ['id', 'nom', 'actions'];
  
  
  
    ouvrirPageSecondaire() {
      this.dialog.open(AddmenuComponent, {
        width: '400px',
        height: '300px',
      });
    }
    ouvrirDialog(templateRef: any) {
      this.dialog.open(templateRef);
    }
  
    fermerDialog() {
      this.dialog.closeAll();
    }
      logoUrl: string | ArrayBuffer | null = null;
    
      onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
          const file = input.files[0];
          const reader = new FileReader();
    
          reader.onload = () => {
            this.logoUrl = reader.result;
          };
    
          reader.readAsDataURL(file);
        }
      }

      ngOnInit(): void {
        this.loadTables();
        
      }

  tables: any[] = [];
  newTable: any = {};
  editingTable: any = null;
  message: string = '';
  selectedTable: number | null = null; 



  loadTables(): void {
    this.tableService.getTables().subscribe(
      (data: any[]) => {
        this.tables = data;
        console.log('Tables loaded:', this.tables);
      },
      error => {
        console.error('Error fetching tables', error);
      }
    );
  }

  addTable() {
    this.tableService.addTable(this.newTable).subscribe(
      (data) => {
        this.newTable = data;
        this.dialog.closeAll();
        this.loadTables(); 
        this.message = 'Table ajouté avec succès!';
      },
      (error) => {
        console.error('Error adding table', error);
      }
    );
  }

  editTable(table: any) {
    this.editingTable = { ...table };
    this.dialog.open(this.dialogTemplate); 
  }

  updateTable() {
    this.tableService.updateTable(this.editingTable.id, this.editingTable).subscribe(
      (data) => {
        this.editingTable = {}; 
        this.dialog.closeAll();
        this.loadTables();
      },
      (error) => {
        console.error('Error updating category', error);
      }
    );
  }

  deleteTable(id: number) {
    this.tableService.deleteTable(id).subscribe(
      (data) => {
        this.loadTables(); 
      },
      (error) => {
        console.error('Error deleting category', error);
      }
    );
  }

}
const ELEMENT_DATA = [
  {id: 1, nom: 'Hydrogen'},
  {id: 2, nom: 'Helium'},
  {id: 3, nom: 'Lithium'},
]