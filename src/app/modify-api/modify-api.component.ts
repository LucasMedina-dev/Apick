import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ApickStruct } from '../create-api/apickStruct.interface';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-api',
  templateUrl: './modify-api.component.html',
  styleUrls: ['./modify-api.component.scss'],
})
export class ModifyApiComponent implements OnChanges, OnInit {
  @Input() dataApick!: ApickStruct;
  dataApickCopy!: ApickStruct;
  closeResult = '';
  faPenToSquare = faPenToSquare;
  formModifier = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private apiManager: ApimanagerService
  ) {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
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
  formName = new FormGroup({
    modifiedEndpoint: new FormControl('', Validators.required),
  });

  buildPreviewApick(data: ApickStruct) {
    this.formModifier = this.formBuilder.group({
      title: [data.title || '', Validators.required],
      description: [data.description || '', Validators.required],
      image: [data.imageUrl || ''],
    });
  }
  switchMethod(endpoint: string, method: string) {
    let endpointToModify = this.dataApick.endpoint.find(
      (e) => e.endpoint === endpoint
    );
    if (endpointToModify) {
      if (endpointToModify.methods.includes(method)) {
        let index = endpointToModify.methods.indexOf(method);
        index !== -1 ? endpointToModify.methods.splice(index, 1) : null;
      } else {
        endpointToModify.methods.push(method);
      }
      if (!endpointToModify.methods.length) {
        endpointToModify.active = false;
      } else {
        endpointToModify.active = true;
      }
    }
  }
  switchEndpointStatus(endpoint: string) {
    let endpointToModify = this.dataApick.endpoint.find(
      (e) => e.endpoint === endpoint
    );
    if (endpointToModify && endpointToModify.methods.length!=0) {
      endpointToModify.active = !endpointToModify.active;
    }else{
      Swal.fire("At least one method must be activated.");
    }
  }
  switchStatus(_id: any) {
    let actives=this.dataApick.endpoint.find((e) => e.active === true);
    if(actives || this.dataApick.active ){
      this.apiManager.updateApickStatus(_id, !this.dataApick.active).subscribe({
        next: () => {
          this.dataApick.active = !this.dataApick.active;

          if(this.dataApick.active){
            Swal.fire("The Api has been started.");
          }else{
            Swal.fire("The Api has been paused.");
          }
          this.modalService.dismissAll();
        },
      });
    }else{
      Swal.fire("At least one method must be activated.");
      this.modalService.dismissAll();
    }
    
  }
  deleteApick(titleToDelete: string) {
    this.apiManager.deleteEntireApick(titleToDelete).subscribe({
      next: () => {
        Swal.fire("The API has been deleted.");
        setTimeout(()=> location.reload(),1500);

      },
    });
  }
  updateApick(dataApick: ApickStruct) {
    
    this.apiManager.updateEntireApick(dataApick, this.dataApickCopy).subscribe({
      next: () => {
        Swal.fire("The API has been modified.");
        setTimeout(()=> location.reload(),1500);
      },
    });
  }
  updateApickData() {
    this.dataApick.title = this.formModifier.value.title || '';
    this.dataApick.description = this.formModifier.value.description || '';
    this.dataApick.imageUrl = this.formModifier.value.image || '';
  }
  editEndpointName(endpointName: string) {
    const endpoint = this.dataApick.endpoint.find(
      (e) => e.endpoint == endpointName
    );
    const endpointNew = this.formName.value.modifiedEndpoint;
    if (endpoint) {
      if (!this.dataApick.endpoint.find((e) => e.endpoint === endpointNew)) {
        endpoint.endpoint = endpointNew || '';
        this.modalService.dismissAll();
      } else {
        Swal.fire("The name already exists.");
      }
    }
  }
  ngOnChanges(): void {
    this.buildPreviewApick(this.dataApick);
  }
  ngOnInit(): void {
    this.apiManager.getApickById(this.dataApick._id || '').subscribe({
      next: (data) => (this.dataApickCopy = data[0]),
    });
  }
}
