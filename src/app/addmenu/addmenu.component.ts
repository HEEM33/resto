import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core';

@Component({
  selector: 'app-addmenu',
  imports: [],
  templateUrl: './addmenu.component.html',
  styleUrl: './addmenu.component.css'
})
export class AddmenuComponent {
  private dialogRef = inject(MatDialogRef<AddmenuComponent>);

  fermer() {
    this.dialogRef.close();
  }

}
