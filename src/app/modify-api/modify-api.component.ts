import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ApickStruct } from '../create-api/apickStruct.interface';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modify-api',
  templateUrl: './modify-api.component.html',
  styleUrls: ['./modify-api.component.scss']
})
export class ModifyApiComponent implements OnChanges, OnInit{
  @Input() dataApick!: ApickStruct;
  dataApickCopy!: ApickStruct;
  closeResult = '';

  formModifier = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private apiManager : ApimanagerService){ }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
  buildPreviewApick(data : ApickStruct){
    this.formModifier = this.formBuilder.group({
      title: [data.title || '', Validators.required],
      description: [data.description || '', Validators.required],
      image: [data.imageUrl || ''],
    });
  }
  switchMethod(endpoint:string, method:string){
    let endpointToModify= this.dataApick.endpoint.find((e)=>e.endpoint===endpoint)
    if(endpointToModify){
      if(endpointToModify.methods.includes(method)){
        let index=endpointToModify.methods.indexOf(method)
        index!==-1 ? endpointToModify.methods.splice(index, 1) : null;
      }else{
        endpointToModify.methods.push(method)
      }
    }
  }
  switchEndpointStatus(endpoint:string){
    let endpointToModify= this.dataApick.endpoint.find((e)=>e.endpoint===endpoint)
    if(endpointToModify){
      endpointToModify.active=!endpointToModify.active
    }
  }
  switchStatus(_id: any) {
    this.apiManager.updateApickStatus(_id , !this.dataApick.active).subscribe({
      next: () => {
        this.dataApick.active = !this.dataApick.active
        this.modalService.dismissAll()
      }
    });
  }
  deleteApick(titleToDelete:string){
    this.apiManager.deleteEntireApick(titleToDelete).subscribe({
      next: () => {
        location.reload()
      }
    });
  }
  updateApick(dataApick:ApickStruct){
    this.apiManager.updateEntireApick(dataApick, this.dataApickCopy).subscribe({
      next: () => {
        location.reload()
      }
    });
  }
  
  ngOnChanges(): void {
    this.buildPreviewApick(this.dataApick)
  }
  ngOnInit(): void {
    this.apiManager.getApickById(this.dataApick._id || '').subscribe({
      next: (data) => this.dataApickCopy=data[0]
    })
  }
}
