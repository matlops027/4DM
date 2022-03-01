import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';


import { NbLayoutModule, NbSidebarModule, NbInputModule, NbSidebarService, NbButtonModule, NbAlertModule, NbSpinnerModule, NbCardModule, NbDatepickerModule, NbCalendarModule } from "@nebular/theme";

import { LoginComponent } from "./login/login.component";
import { RegistroDoadorComponent } from "./registro-doador/registro-doador.component";
import { RegistroAdmComponent } from './registro-adm/registro-adm.component';
import { RegistroInstComponent } from './registro-inst/registro-inst.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations:[
       LoginComponent,
       RegistroDoadorComponent,
       RegistroAdmComponent,
       RegistroInstComponent 
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        NbCardModule,
        NbLayoutModule,
        NbSidebarModule,
        NbInputModule,
        NbButtonModule,
        NbAlertModule,
        NbDatepickerModule,
        NbCalendarModule
    ],

    providers: [NbSidebarService]
})
export class AutenticationModule{

}