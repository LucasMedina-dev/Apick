import { Component } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';

@Component({
  selector: 'app-modify-api',
  templateUrl: './modify-api.component.html',
  styleUrls: ['./modify-api.component.scss']
})
export class ModifyApiComponent {

  constructor(private apiManager: ApimanagerService){}

  
}
