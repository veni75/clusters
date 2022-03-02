import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenerateComponent } from './pages/generate/generate.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: 'generate', component: GenerateComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
