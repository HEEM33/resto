import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-client',
  imports: [MatFormFieldModule,MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, MatDialogModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
   @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
    selectedSection: string = 'menu'; 
    private dialog = inject(MatDialog);
    afficherSection(section: string) { 
      this.selectedSection = section;
    }
  
    ouvrirDialog(templateRef: any) {
      this.dialog.open(templateRef);
    }
  
    fermerDialog() {
      this.dialog.closeAll();
    }

}
