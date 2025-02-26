import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddmenuComponent } from '../addmenu/addmenu.component';
import { inject } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, 
    MatFormFieldModule, MatCheckboxModule, MatDialogModule, MatInputModule, CommonModule],
  templateUrl: './parametre.component.html',
  styleUrl: './parametre.component.css'
})
export class ParametreComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  selectedSection: string = 'menu'; 
  private dialog = inject(MatDialog);
  afficherSection(section: string) { 
    this.selectedSection = section;
  }


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

 
}
