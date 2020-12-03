import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html'

})
export class FormComponent implements OnInit {
	
	private cliente: Cliente = new Cliente()
	private titulo: string = "Crear Cliente"

	constructor(private clienteService: ClienteService, private router: Router,
		private activatedRouter: ActivatedRoute) { }

	ngOnInit() {
		this.cargarCliente()
	}

	cargarCliente(): void {
		this.activatedRouter.params.subscribe(params => {
			let id = params['id']
			if(id){
				this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
			}	
		})
	}

	create(): void {
		this.clienteService.create(this.cliente).subscribe(
			cliente => {
				this.router.navigate(['/clientes'])
				swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con exito!`, 'success')
			}
		)
	}

	update(): void {
		this.clienteService.update(this.cliente).subscribe(
			json => {
				this.router.navigate(['/clientes'])
				swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre} `, 'success')
			}
		)
	}
}
