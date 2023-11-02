import { Component, Input } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ApimanagerService } from '../apimanager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myapick',
  templateUrl: './myapick.component.html',
  styleUrls: ['./myapick.component.scss']
})
export class MyapickComponent {
  faChevronRight = faChevronRight;
  selectedApi: any;
  apick!: any;
  endpoints: any;
  id!: string;
  @Input() data: any;

  constructor(private apiManager: ApimanagerService, private route: ActivatedRoute) { }

  selectIdApi(id: any) {
    //this.id = this.route.snapshot.paramMap.get("id") || '';
    //this.apiManager.getApickById(this.id).subscribe((data) => {
      //this.apick = data[0];
      //this.endpoints = this.apick.endpoint.filter((e: any) => e.active === true);
      //console.log(this.apick);
    //})
  }


}
