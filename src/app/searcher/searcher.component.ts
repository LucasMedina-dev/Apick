import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ApimanagerService } from '../apimanager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  query!:string;
  show: boolean=false;

  constructor(private apiManager:ApimanagerService, private router: Router){
    const URL= this.router.url
    URL==="/" ? this.show=true : this.show=false;
    console.log(this.router)
  }

  goSearch(query:string){
    const regex = new RegExp(query, 'i');
    this.apiManager.setFiltered(this.apiManager.data.filter((element:any)=> regex.test(element.title)));

  }


}
