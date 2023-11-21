import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CustomizerStruct } from '../structures/customizerStruct.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApimanagerService } from '../apimanager.service';

@Component({
  selector: 'app-custom-endpoint',
  templateUrl: './custom-endpoint.component.html',
  styleUrls: ['./custom-endpoint.component.scss'],
})
export class CustomEndpointComponent implements OnChanges {
  @Input() customizerData!: CustomizerStruct;
  @Input() endpointData: any;
  constructor(private apiManager : ApimanagerService) {}
  formCustomizer = new FormGroup({
    queryParameters: new FormControl(false, Validators.required),
    limitDocuments: new FormControl(0, Validators.required),
    randomResponse: new FormControl(false, Validators.required),
  });
  saveCustomData(){
    this.apiManager.saveCustomizerData(this.customizerData, this.formCustomizer.value).subscribe({
      next: (response)=>{
        console.log(response)
      }
    })
  }
  ngOnChanges() {
    if (this.customizerData) {
      this.formCustomizer.patchValue({
        queryParameters: this.customizerData.queryParameters,
        limitDocuments: this.customizerData.limitDocuments,
        randomResponse: this.customizerData.randomResponse
      });
    }
  }
}
