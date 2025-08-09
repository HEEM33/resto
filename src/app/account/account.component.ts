import { Component, inject } from '@angular/core';
import { AddmenuComponent } from '../addmenu/addmenu.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [MatDialogModule, CommonModule, MatTableModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  private dialog = inject(MatDialog);

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
       displayedColumns: string[] = ['date', 'quantite', 'status'];
  dataSource = ELEMENT_DATA;
      

}
const ELEMENT_DATA = [
  {date: 1, quantite: 'Hydrogen', status: 1.0079},
  {date: 2, quantite: 'Helium', status: 4.0026},
  {date: 3, quantite: 'Lithium', status: 6.941},
]