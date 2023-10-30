import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormGroup,  FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
	logueado:Boolean=false;
	closeResult = '';
	isActive:boolean = false;

	formUser= new FormGroup({
		'username':new FormControl('', Validators.required),
		'password':new FormControl('', Validators.required)
	})
	formRegister= new FormGroup({
		'username':new FormControl('', Validators.required),
		'password':new FormControl('', Validators.required),
		'email':new FormControl('', Validators.required),
		'fullname':new FormControl('', Validators.required)
	})



	constructor(private modalService: NgbModal, private loginService: LoginService) {

	}
	ngOnInit(): void {

	}

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
	onSubmit(data:any){
		this.loginService.tryLogin(data.username, data.password)
		.then((res)=>{
			this.logueado=res
			this.loginService.logueado=true;
			this.loginService.username=data.username;
			this.modalService.dismissAll()
		})
		.catch((res)=>{
			this.isActive = true;	
		})
	}
	onRegister(data:any){
		this.loginService.tryRegister(data)
		.then((res)=>{
			console.log(res)
		})
		.catch((res)=>{
			alert('Error al registro');
		})
	}
	closeSesion(){
		this.loginService.closeSesion();
		this.logueado=this.loginService.logueado
	}

	resetForm(){
		this.isActive = false;
	}
}
