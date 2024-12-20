import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../../models/servicios';
import { Contrato } from '../../../models/contrato';
import { ServiciosService } from '../../../services/servicios.service';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-creaeditaservicios',
  standalone: true,
  providers: [],
  imports: [  MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,RouterModule],
  templateUrl: './creaeditaservicios.component.html',
  styleUrl: './creaeditaservicios.component.css',
})
export class CreaeditaserviciosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  servicios: Servicios = new Servicios();
  id: number = 0;
  edicion: boolean = false;

  listaCategoria: { value: string; viewValue: string }[] = [
    { value: 'MuyBuena', viewValue: 'Promocion marca' },
    { value: 'Buena', viewValue: 'Publicacion sobre marca' },
    { value: 'Mala', viewValue: 'Historia para marca' },
    { value: 'MuyMala', viewValue: 'Video para marca' },
  ];
  listaEstado: { value: string; viewValue: string }[] = [
    { value: 'No_Disponible', viewValue: 'Activo' },
    { value: 'Disponible', viewValue: 'En curso' },
    { value: 'SinInformacion', viewValue: 'Finalizado' },
  ];
  listaContrato: Contrato[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private Ss: ServiciosService,
    private router: Router,
    private Cs: ContratoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Detecta si es edición o creación
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // Inicializa datos si es edición
    });

    // Carga lista de contratos
    this.Cs.list().subscribe((data) => {
      this.listaContrato = data;
    });

    // Inicializa el formulario
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hprecio: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ], // Acepta números con 2 decimales
      hcategoria: ['', Validators.required],
      hestado: ['', Validators.required],
      hcontrato: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Asigna valores al modelo `servicios`
      this.servicios.id = this.form.value.hcodigo;
      this.servicios.nombre_servicio = this.form.value.hnombre;
      this.servicios.descripcion = this.form.value.hdescripcion;
      this.servicios.precio = this.form.value.hprecio;
      this.servicios.categoria_servic = this.form.value.hcategoria;
      this.servicios.estado_servic = this.form.value.hestado;
      this.servicios.contrato.id =  this.form.value.hcontrato; // Asigna el contrato correctamente

      // Editar o registrar
      if (this.edicion) {
        this.Ss.update(this.servicios).subscribe(() => {
          this.actualizarListaServicios();
        });
      } else {
        this.Ss.insert(this.servicios).subscribe(() => {
          this.actualizarListaServicios();
        });
      }
      this.router.navigate(['servicio']);
    } else {
      console.error('Formulario inválido:', this.form.errors);
    }
  }

  init(): void {
    if (this.edicion) {
      this.Ss.listId(this.id).subscribe((data) => {
        // Prellena el formulario con los datos del servicio
        this.form = this.formBuilder.group({
          hcodigo: [data.id],
          hnombre: [data.nombre_servicio, Validators.required],
          hdescripcion: [data.descripcion, Validators.required],
          hprecio: [data.precio, Validators.required],
          hcategoria: [data.categoria_servic, Validators.required],
          hestado: [data.estado_servic, Validators.required],
          hcontrato: [data.contrato?.id, Validators.required], // Asegura que contrato esté definido
        });
      });
    }
  }

  private actualizarListaServicios(): void {
    this.Ss.list().subscribe((data) => {
      this.Ss.setList(data); // Actualiza la lista de servicios en el servicio
    });
  }
}
