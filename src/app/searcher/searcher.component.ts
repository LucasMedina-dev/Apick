import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ApimanagerService } from '../apimanager.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  query!:string;

  constructor(private apiManager:ApimanagerService){

  }

  goSearch(query:string){
    const regex = new RegExp(query, 'i');
    //this.apiManager.filtered = this.apiManager.data.filter((element:any)=> regex.test(element.title));
    this.apiManager.setFiltered(this.apiManager.data.filter((element:any)=> regex.test(element.title)));
  }

}
