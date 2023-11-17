import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormGroup,  FormControl, Validators} from '@angular/forms';
import { NavbarSearcherService } from '../navbar-searcher.service';

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
		'username':new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(24), Validators.pattern('[a-zA-Z0-9]*')])),
		'password':new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(24)]))
	})
	formRegister= new FormGroup({
		'username':new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(24), Validators.pattern('[a-zA-Z0-9]*')])),
		'password':new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(24)])),
		'email':new FormControl('', Validators.compose([Validators.required, Validators.email])),
		'fullname':new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z\\s]+$')]))
	})



	constructor(private modalService: NgbModal, private authService: AuthService, private navBarValue: NavbarSearcherService) {}


	open(content:any) {
		this.isActive=false;
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
		this.authService
		.tryLogin(data.username, data.password)
		.subscribe({
			next: (res)=>{
				this.logueado=res
				this.authService.logueado=true;
				this.authService.username=data.username;
				this.modalService.dismissAll()
				localStorage.setItem("username", data.username)

			},
			error: ()=>{
				this.isActive = true;	
			}
		})
		
	}
	onRegister(data:any){
		this.authService.tryRegister(data)
		.then((data)=>{
			if(data.message){
				this.isActive=true
			}else if(data._id){
				this.modalService.dismissAll()
				alert("Cuenta creada")
				
			}})
		.catch((res)=>{
			alert('Error al registro');
		})
	}
	closeSesion(){
		this.authService.closeSesion();
		this.logueado=this.authService.logueado
		this.renderSearch(true)
		localStorage.removeItem("username")
		this.modalService.dismissAll()
	}

	resetForm(){
		this.isActive = false;
	}

	renderSearch(value:boolean){
		this.navBarValue.changeState(value);
	}
	ngOnInit(): void {
		let username=localStorage.getItem("username")
		if(username!=undefined){
			this.logueado=true
			this.authService.logueado=true;
			this.authService.username=username;
		}
	}
}
