import { Component, Input, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SearcherComponent } from '../searcher/searcher.component';
@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.scss']
})
export class ApiDataComponent implements OnInit{
  @Input() apickData:any;
  faChevronRight=faChevronRight;

  constructor(){}


  ngOnInit(): void {
    console.log(this.apickData)
    this.apickData.url=`/apick/${this.apickData._id}`
  }


}
