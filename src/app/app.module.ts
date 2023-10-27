import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TitleComponent } from './title/title.component';
import { SearcherComponent } from './searcher/searcher.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ApiDataComponent } from './api-data/api-data.component';
import { HomeComponent } from './home/home.component';
import { YourApisComponent } from './your-apis/your-apis.component';
import { HeaderComponent } from './header/header.component';
import { MyapickComponent } from './myapick/myapick.component';
import { ApiviewComponent } from './apiview/apiview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TitleComponent,
    SearcherComponent,
    ApiDataComponent,
    HomeComponent,
    YourApisComponent,
    HeaderComponent,
    MyapickComponent,
    ApiviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
