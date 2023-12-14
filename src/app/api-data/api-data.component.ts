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
  defectImg="https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png";
  constructor(){
  }
  switchImg(needSwitch : boolean){
    needSwitch ? this.apickData.imageUrl= this.defectImg : false;
  }

  ngOnInit(): void {
    this.apickData.url=`/apick/${this.apickData._id}`
  }


}
