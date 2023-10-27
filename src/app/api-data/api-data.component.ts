import { Component } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.scss']
})
export class ApiDataComponent {
  constructor(private apiManager: ApimanagerService){

  }
}
