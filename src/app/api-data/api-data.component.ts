import { Component, Input, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.scss']
})
export class ApiDataComponent implements OnInit{
  @Input() apickData:any;
  faChevronRight=faChevronRight;

  constructor(){
  }


  ngOnInit(): void {
    this.apickData.url=`/apick/${this.apickData._id}`
  }


}
