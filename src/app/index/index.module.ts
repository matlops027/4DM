import { NgModule } from "@angular/core";
import { IndexAdminComponent } from "./index-admin/index-admin.component";
import { IndexDoadorComponent } from "./index-doador/index-doador.component";
import { IndexInstituicaoComponent } from "./index-instituicao/index-instituicao.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NbCardModule, NbLayoutModule, NbSidebarModule, NbInputModule, NbButtonModule, NbAlertModule, NbSpinnerModule, NbDatepickerModule, NbCalendarModule, NbSidebarService, NbUserModule, NbMenuModule } from "@nebular/theme";
import { AutenticationModule } from "../autentication/autentication.module";
import { DoacoesComponent } from './index-admin/doacoes/doacoes.component';
import { RouterModule } from "@angular/router";
import { CadProdComponent } from './index-admin/cad-prod/cad-prod.component';
import { ListarProdComponent } from './index-admin/listar-prod/listar-prod.component';
import { ListarAdmComponent } from "./index-admin/listar-adm/listar-adm.component";
import { ListarInstComponent } from './index-admin/listar-inst/listar-inst.component';
import { CadDoacaoComponent } from './index-doador/cad-doacao/cad-doacao.component';
import { PropriasDoacoesComponent } from './index-doador/proprias-doacoes/proprias-doacoes.component';
import { DoacoesRecebidasComponent } from "./index-instituicao/doacoes-recebidas/doacoes-recebidas.component";
import { DoacoesConfirmComponent } from './index-instituicao/doacoes-confirm/doacoes-confirm.component';
import { ListDoadoresComponent } from './index-admin/list-doadores/list-doadores.component';
import { DoacoesNaoConfComponent } from './index-doador/doacoes-nao-conf/doacoes-nao-conf.component';
import { DefiniPrioridadeComponent } from './index-instituicao/defini-prioridade/defini-prioridade.component';
import { MostrarPrioridadeComponent } from './index-instituicao/mostrar-prioridade/mostrar-prioridade.component';


@NgModule({
    declarations: [
        IndexAdminComponent,
        IndexDoadorComponent,
        IndexInstituicaoComponent,
        DoacoesComponent,
        CadProdComponent,
        ListarProdComponent,
        ListarAdmComponent,
        ListarInstComponent,
        CadDoacaoComponent,
        PropriasDoacoesComponent,
        DoacoesRecebidasComponent,
        DoacoesConfirmComponent,
        ListDoadoresComponent,
        DoacoesNaoConfComponent,
        DefiniPrioridadeComponent,
        MostrarPrioridadeComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NbMenuModule,
        NbCardModule,
        NbLayoutModule,
        NbUserModule,
        NbSidebarModule,
        NbInputModule,
        NbButtonModule,
        NbAlertModule,
        NbSpinnerModule,
        NbDatepickerModule,
        NbCalendarModule,
        AutenticationModule
    ],

    providers: [NbSidebarService]

})
export class IndexModule{

}