import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CustomizerStruct } from '../structures/customizerStruct.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApimanagerService } from '../apimanager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-custom-endpoint',
  templateUrl: './custom-endpoint.component.html',
  styleUrls: ['./custom-endpoint.component.scss'],
})
export class CustomEndpointComponent implements OnChanges {
  @Input() customizerData!: CustomizerStruct;
  @Input() endpointData: any;
  documents !: any;
  constructor(private apiManager: ApimanagerService) {}
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
  launchTest() {
    let idEndpoint = this.customizerData.idEndpoint;
    //let method = this.customizerData.method;
    let url = `http://localhost:3000/api/endpoint/${idEndpoint}`;
    this.apiManager.getDocs(url).subscribe({
      next: (data)=> {
        this.documents=data;
      }
    })
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
