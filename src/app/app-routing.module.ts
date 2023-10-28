import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourApisComponent } from './your-apis/your-apis.component';
import { HomeComponent } from './home/home.component';
import { ApiviewComponent } from './apiview/apiview.component';
import { ResponseComponent } from './response/response.component';

const routes: Routes = [
  {path:'', component:HomeComponent },
  {path:'yourapis', component:YourApisComponent },
  {path:'apick/:id', component:ApiviewComponent },
  {path:'apick/:id/:endpoint', component:ResponseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
