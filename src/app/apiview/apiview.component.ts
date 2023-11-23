import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ActivatedRoute } from '@angular/router';
import { ApickStruct } from '../create-api/apickStruct.interface';
import { NavbarSearcherService } from '../navbar-searcher.service';
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
  defectImg = "https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png";
  methods!: any;

  constructor(
    private apiManager: ApimanagerService,
    private route: ActivatedRoute,
    private searcher: NavbarSearcherService,
    private login: AuthService
  ) { }

  logInUser() {
    if (this.login.getUsername() != undefined) {
      return true;
    } else {
      return false;
    }
  }

  fillMethodEndpoint() {
    if (this.logInUser()) {
      for(let i=0; i<this.endpoints.length;i++){
        console.log(this.endpoints[i]);
        for(let j=0; i<this.endpoints[i].method;j++){
          console.log(this.endpoints[i].method[j]);
          this.methods.push(this.endpoints[i].method[j]);
        }
      }
      console.log(this.methods);
    } else {
      alert('NO logueado');
      console.log(this.endpoints[0].methods[0]);
    }
  }

  launchTest(endpointName: string, method: any) {
    let option = method.selectedOptions[0].innerText;
    let url = `http://localhost:3000/api/apick/${this.id}/${endpointName}`;
    if (method.selectedIndex > 0) {
      if (option == 'GET') {
        this.apiManager.getDocs(url).subscribe({
          next: (data) => (this.response = data),
        });
      } else if (this.logInUser()) {
        this.apiManager.postDoc(url, JSON.parse(this.objectToPost)).subscribe({
          next: (data) => (this.response = data),
        });
      } else {
        Swal.fire("You are a guest!!, you need to login o create a account");
        Swal.fire({
          icon: "error",
          title: "Method not available!",
          text: "You need to login or create an account"
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
      },
      complete:()=>{
        //this.fillMethodEndpoint();
      }
    });
  }


}
