import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apiview',
  templateUrl: './apiview.component.html',
  styleUrls: ['./apiview.component.scss']
})
export class ApiviewComponent implements OnInit {
  apick!:any;
  id!:string;
  constructor(private apiManager : ApimanagerService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id") || '';
    this.apiManager.getApickById(this.id).then((data)=>{
      this.apick=data[0];
    })
  }
}
