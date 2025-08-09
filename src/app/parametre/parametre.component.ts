import { Component} from '@angular/core';
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
import { CategorieService } from '../services/categorie.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { UserComponent } from '../user/user.component';
import { AccountComponent } from '../account/account.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TypeService } from '../services/type.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [MatListModule, FormsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, 
    MatFormFieldModule, MatCheckboxModule, MatDialogModule, MatInputModule, CommonModule, RestaurantComponent,
  UserComponent, AccountComponent, MatTableModule, MatSelectModule, MatOptionModule],
  templateUrl: './parametre.component.html',
  styleUrl: './parametre.component.css'
})
export class ParametreComponent {
  private categorieService = inject(CategorieService);
  private typeService = inject(TypeService);
  private menuService = inject(MenuService);

  displayedMenuColumns: string[] = ['nom', 'prix', 'categorie', 'type'];
  displayedCategorieColumns: string[] = ['id', 'name', 'actions'];
  displayedTypeColumns: string[] = ['id', 'name', 'actions'];

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('categoryDialog1') categoryDialog1!: TemplateRef<any>
  private dialog = inject(MatDialog);

  selectedSection: string = 'menu'; 

  afficherSection(section: string) { 
    this.selectedSection = section;
  }

  sectionActive: string = 'menu';

  afficheSection(section: string): void {
    this.sectionActive = section;
  }

   ngOnInit(): void {
    this.loadCategories();
    this.loadTypes();
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


//categorie
  categories: any[] = [];
  newCategory: any = {};
  editingCategory: any = null;
  message: string = '';
  selectedCategory: number | null = null; 



  loadCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  addCategory() {
    this.categorieService.addCategory(this.newCategory).subscribe(
      (data) => {
        this.newCategory = data;
        this.dialog.closeAll();
        this.loadCategories(); 
        this.message = 'Catégorie ajouté avec succès!';
      },
      (error) => {
        console.error('Error adding category', error);
      }
    );
  }

  editCategory(category: any) {
    this.editingCategory = { ...category };
    this.dialog.open(this.categoryDialog1); 
  }

  updateCategory() {
    this.categorieService.updateCategory(this.editingCategory.id, this.editingCategory).subscribe(
      (data) => {
        this.editingCategory = {}; 
        this.dialog.closeAll();
        this.loadCategories();
      },
      (error) => {
        console.error('Error updating category', error);
      }
    );
  }

  deleteCategory(id: number) {
    this.categorieService.deleteCategory(id).subscribe(
      (data) => {
        this.loadCategories(); 
      },
      (error) => {
        console.error('Error deleting category', error);
      }
    );
  }

  //menu
  menus: any[] = [];
  newMenu: any = {};
  editingMenu: any = null;
  selectedMenu: any; 



  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (data: any[]) => {
        this.menus = data;
        console.log('Menus loaded:', this.types);
      },
      error => {
        console.error('Error fetching menus', error);
      }
    );
  }

  addMenu() {
    this.menuService.addMenu(this.newMenu).subscribe(
      (data) => {
        this.newMenu = data;
        this.dialog.closeAll();
        this.loadMenus(); 
        this.message = 'Menu ajouté avec succès!';
      },
      (error) => {
        console.error('Error adding menu', error);
      }
    );
  }

  editMenu(menu: any) {
    this.editingMenu = { ...menu };
    this.dialog.open(this.categoryDialog1); 
  }

  updateMenu() {
    this.menuService.updateMenu(this.editingMenu.id, this.editingMenu).subscribe(
      (data) => {
        this.editingMenu = {}; 
        this.dialog.closeAll();
        this.loadTypes();
      },
      (error) => {
        console.error('Error updating menu', error);
      }
    );
  }

  deleteMenu(id: number) {
    this.menuService.deleteMenu(id).subscribe(
      (data) => {
        this.loadMenus(); 
      },
      (error) => {
        console.error('Error deleting menu', error);
      }
    );
  }

  //type
  types: any[] = [];
  newType: any = {};
  editingType: any = null;
  selectedType: number | null = null;  



  loadTypes(): void {
    this.typeService.getTypes().subscribe(
      (data: any[]) => {
        this.types = data;
        console.log('Types loaded:', this.types);
      },
      error => {
        console.error('Error fetching types', error);
      }
    );
  }

  addType() {
    this.typeService.addType(this.newType).subscribe(
      (data) => {
        this.newType = data;
        this.dialog.closeAll();
        this.loadTypes(); 
        this.message = 'Type ajouté avec succès!';
      },
      (error) => {
        console.error('Error adding type', error);
      }
    );
  }

  editType(type: any) {
    this.editingType = { ...type };
    this.dialog.open(this.categoryDialog1); 
  }

  updateType() {
    this.typeService.updateType(this.editingType.id, this.editingType).subscribe(
      (data) => {
        this.editingType = {}; 
        this.dialog.closeAll();
        this.loadTypes();
      },
      (error) => {
        console.error('Error updating type', error);
      }
    );
  }

  deleteType(id: number) {
    this.typeService.deleteType(id).subscribe(
      (data) => {
        this.loadTypes(); 
      },
      (error) => {
        console.error('Error deleting type', error);
      }
    );
  }
 
}

