import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CustomizerStruct } from '../structures/customizerStruct.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApimanagerService } from '../apimanager.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-custom-endpoint',
  templateUrl: './custom-endpoint.component.html',
  styleUrls: ['./custom-endpoint.component.scss'],
})
export class CustomEndpointComponent implements OnChanges {
  @Input() customizerData!: CustomizerStruct;
  @Input() endpointData: any;
  @Input() apiId: any;
  documents !: any;
  constructor(private apiManager: ApimanagerService, private auth: AuthService) {}
  formCustomizer = new FormGroup({
    queryParameters: new FormControl(false, Validators.required),
    limitDocuments: new FormControl(0, Validators.required),
    randomResponse: new FormControl(false, Validators.required),
  });
  saveCustomData() {
    this.apiManager
      .saveCustomizerData(this.customizerData, this.formCustomizer.value)
      .subscribe({
        next: (response) => {
          Swal.fire("Customized method saved.")
        },
      });
  }

  petition(url: string, API_KEY: string){
    return this.apiManager.getDocs(url, API_KEY).subscribe({
      next: (data)=> {
        this.documents=data;
      }
    })
  }

  launchTest() {
    let idEndpoint = this.customizerData.idEndpoint;
    let url = `https://apickdb.fly.dev/api/endpoint/${idEndpoint}`;
    let username= this.auth.getUsername()
    // Busco si existe la api key
    let API_KEY:string;
    this.apiManager.getApiKey(this.apiId, username).subscribe({
      next: (result)=>{
        if(result.apiKey){
          API_KEY= result.apiKey.key
          this.petition(url, API_KEY)
        }else{
          this.apiManager.createUserKey(this.apiId, username).subscribe({
            next: (result)=>{
              API_KEY= result.key
              this.petition(url, API_KEY)
            }
          })
        }
      }
    })
    // Si no existe la creo
    // Si existe la envio abajo

    
  }
  ngOnChanges() {
    this.documents=Object;
    if (this.customizerData) {
      this.formCustomizer.patchValue({
        queryParameters: this.customizerData.queryParameters,
        limitDocuments: this.customizerData.limitDocuments,
        randomResponse: this.customizerData.randomResponse,
      });
    }
  }
}
