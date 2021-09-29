import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordianComponent } from './accordian/accordian.component';
import { AgTableComponent } from './ag-table/ag-table.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/ag', pathMatch: "full"
  },
  {
    path: 'accordian', component: AccordianComponent
  },
  {
    path: 'ag', component: AgTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
