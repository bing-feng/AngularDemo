import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { TableComponent } from './admin/table/table.component';
import { LoginComponent } from './login/login.component';
import { FormsComponent } from './admin/forms/forms.component';
import { ChartsComponent } from './admin/charts/charts.component';
import { TreeComponent } from './admin/tree/tree.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent, 
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'table', component: TableComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'charts', component: ChartsComponent },
      { path: 'tree', component: TreeComponent }
    ] 
  },
  { path: 'login', component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
