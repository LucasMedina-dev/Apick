import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { Subscription } from 'rxjs';
import { ApickStruct } from '../create-api/apickStruct.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  public apick!:any;

  constructor(private apiManager : ApimanagerService){}

  ngOnInit(): void {
    this.apiManager.getAllApicks().subscribe({
      next: (data)=>{
        this.apiManager.data = data as ApickStruct;
        this.apiManager.setFiltered(data);
        this.apiManager.getFiltered.subscribe((data)=>{this.apick = data});
      }
    })
  }

}
