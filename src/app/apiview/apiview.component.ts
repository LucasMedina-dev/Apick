import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ActivatedRoute } from '@angular/router';
import { ApickStruct } from '../create-api/apickStruct.interface';
import { NavbarSearcherService } from '../navbar-searcher.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-apiview',
  templateUrl: './apiview.component.html',
  styleUrls: ['./apiview.component.scss'],
})
export class ApiviewComponent implements OnInit {
  apick!: ApickStruct;
  endpoints: any;
  id!: string;
  response!: any;
  objectToPost!: any;
  defectImg="https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png";
  apiKey!: any;

  constructor(
    private apiManager: ApimanagerService,
    private route: ActivatedRoute,
    private searcher: NavbarSearcherService,
    private login: AuthService
  ) {}
  
  launchTest(endpointName: string, method: any) {
    let option = method.selectedOptions[0].innerText;
    let url = `http://localhost:3000/api/apick/${this.id}/${endpointName}`;
    if (method.selectedIndex > 0) {
      if (option == 'GET') {
        this.apiManager.getDocs(url).subscribe({
          next: (data) => (this.response = data),
        });
      } else {
        this.apiManager.postDoc(url, JSON.parse(this.objectToPost)).subscribe({
          next: (data) => (this.response = data),
        });
      }
    }
  }
  switchImg(needSwitch: boolean) {
    needSwitch ? (this.apick.imageUrl = this.defectImg) : false;
  }
  ngOnInit(): void {
    this.searcher.changeState(false);
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.apiManager.getApickById(this.id).subscribe({
      next: (data) => {
        this.apick = data[0];
        this.endpoints = this.apick.endpoint.filter(
          (e: any) => e.active === true
        );
        this.apiManager.getApiKey(this.id, this.login.getUsername() || false).subscribe({
          next: (result)=> {
            this.apiKey= result
          }
        })
      },
    });
    
  }
}
