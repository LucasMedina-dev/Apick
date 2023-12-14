import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ActivatedRoute } from '@angular/router';
import { ApickStruct } from '../create-api/apickStruct.interface';
import { AuthService } from '../auth.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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
  defectImg =
    'https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png';
  enabledKey: boolean = false;
  apiKey!: string;

  constructor(
    private apiManager: ApimanagerService,
    private route: ActivatedRoute,
    private login: AuthService
  ) {}

  logInUser() {
    if (this.login.getUsername() != undefined) {
      return true;
    } else {
      return false;
    }
  }

  launchTest(endpointName: string, method: any) {
    let option = method.selectedOptions[0].innerText;
    let url = `https://apickdb.fly.dev/api/apick/${this.id}/${endpointName}`;
    let autorization= this.apiKey || false;
    this.enabledKey ? true : this.apiKey='';
    if (method.selectedIndex > 0) {
      if(autorization || !this.enabledKey){
        if (option == 'GET') {
          this.apiManager.getDocs(url, this.apiKey).subscribe({
            next: (data) => (this.response = data),
          });
        } else if (this.logInUser()) {
          this.apiManager.postDoc(url, JSON.parse(this.objectToPost), this.apiKey).subscribe({
            next: (data) => (this.response = data),
          });
        } else {
          Swal.fire('You are a guest!!, you need to login o create a account');
          Swal.fire({
            icon: 'error',
            title: 'Method not available!',
            text: 'You need to login or create an account',
          });
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Method not available!',
          text: 'This API requires API KEY, be sure you are logged in or generated a key',
        });
      }
      
    }
  }
  switchImg(needSwitch: boolean) {
    needSwitch ? (this.apick.imageUrl = this.defectImg) : false;
  }
  generateApiKey(){
    let username=this.login.getUsername() || false
    
    if(username && !this.apiKey && this.apick._id){
      
      this.apiManager.createUserKey(this.apick._id, username).subscribe({
        next: (result)=>{
          if(result.apiKey!=undefined){
            this.apiKey= result.apiKey.key
          }
        }
      })
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.apiManager.getApickById(this.id).subscribe({
      next: (data) => {
        this.apick = data[0];
        this.endpoints = this.apick.endpoint.filter(
          (e: any) => e.active === true
        );
        this.apiManager
          .getApiKey(this.id, this.login.getUsername() || false)
          .subscribe({
            next: (result) => {
              result.keyEnabled ? (this.enabledKey = true) : false;
              if (result.apiKey != undefined) {
                this.apiKey = result.apiKey.key;
                
              }
            },
          });
      },
    });
  }
}
