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

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule, CommonModule],
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
  ouvrirDialog() {
    this.dialog.open(this.dialogTemplate);
  }

  fermerDialog() {
    this.dialog.closeAll();
  }
}
