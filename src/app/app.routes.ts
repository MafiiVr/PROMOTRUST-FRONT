import { Routes } from '@angular/router';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertarUsuarioComponent } from './components/usuario/insertar-usuario/insertar-usuario.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { CreaeditapreguntasComponent } from './components/preguntas/creaeditapreguntas/creaeditapreguntas.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { CreaeditaincidenciasComponent } from './components/incidencias/creaeditaincidencias/creaeditaincidencias.component';
import { TipsComponent } from './components/tips/tips.component';
import { CreaditatipsComponent } from './components/tips/creaditatips/creaditatips.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CreaeditaserviciosComponent } from './components/servicios/creaeditaservicios/creaeditaservicios.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { CreaeditaevaluacionComponent } from './components/evaluacion/creaeditaevaluacion/creaeditaevaluacion.component';
import { LoginComponent } from './components/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ListarcontratoComponent } from './components/contrato/listarcontrato/listarcontrato.component';
import { EditarcontratoComponent } from './components/contrato/editarcontrato/editarcontrato.component';
import { CreaeditacontratousuarioComponent } from './components/contratousuario/creaeditacontratousuario/creaeditacontratousuario.component';
import { ActualizarcontratousuarioComponent } from './components/contratousuario/actualizarcontratousuario/actualizarcontratousuario.component';
import { RegistrarcontratoComponent } from './components/contrato/registrarcontrato/registrarcontrato.component';
import { RegistarcontratousuarioComponent } from './components/contratousuario/registarcontratousuario/registarcontratousuario.component';
import { CreaeditametricaComponent } from './components/metricas/creaeditametrica/creaeditametrica.component';
import { ActualizarmetricaComponent } from './components/metricas/actualizarmetrica/actualizarmetrica.component';
import { RegistrarmetricaComponent } from './components/metricas/registrarmetrica/registrarmetrica.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'promohome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'promohome',
    component: LandingComponent,
  },
  {
    path: '',
    redirectTo: '/bienvenido',
    pathMatch: 'full',
  },
  {
    path: 'bienvenido',
    component: InicioComponent,
  },
  {
    path: 'contratousuario',
    component: ContratousuarioComponent,
    children: [
      {
        path: 'creareditar',
        component: CreaeditacontratousuarioComponent,
      },
      {
        path: 'actualizar/:id',
        component: ActualizarcontratousuarioComponent,
      },
      {
        path: 'insertar',
        component: RegistarcontratousuarioComponent,
      }
    ],
  },
  {
    path: 'contrato',
    component: ContratoComponent,
    children: [
      {
        path: 'contratocreaedita',
        component: ListarcontratoComponent,
      },
      {
        path: 'contratoeditar/:id',
        component:EditarcontratoComponent,
      },
    ],
  },
  {
    path: 'preguntas',
    component: PreguntasComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditapreguntasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditapreguntasComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'incidencias',
    component: IncidenciasComponent, // corregido el typo aquí
    children: [
      {
        path: 'nuevo',
        component: CreaeditaincidenciasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaincidenciasComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'metricas',
    component: MetricasComponent,
    children:[
      {
        path: 'creaeditarm',
        component: CreaeditametricaComponent,
      },
      {
        path:'actualizar/:id',
        component:ActualizarmetricaComponent
      },
      {
        path:'registrar',
        component:RegistrarmetricaComponent,
      }
    ]
  },
  {
    path: 'servicio',
    component: ServiciosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaserviciosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaserviciosComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'evaluacion',
    component: EvaluacionComponent, // corregido el typo aquí
    children: [
      {
        path: 'nuevo',
        component: CreaeditaevaluacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaevaluacionComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'vertips',
    component: TipsComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaditatipsComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaditatipsComponent,
      },
    ],
    canActivate: [segGuard],
  },

  //usuario
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarUsuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarUsuarioComponent,
      },
    ],
    canActivate: [segGuard],
  },
];
