import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './autentication/login/login.component';
import { RegistroDoadorComponent } from './autentication/registro-doador/registro-doador.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistroAdmComponent } from './autentication/registro-adm/registro-adm.component';
import { RegistroInstComponent } from './autentication/registro-inst/registro-inst.component';
import { IndexAdminComponent } from './index/index-admin/index-admin.component';
import { IndexDoadorComponent } from './index/index-doador/index-doador.component';
import { IndexInstituicaoComponent } from './index/index-instituicao/index-instituicao.component';
import { CadProdComponent } from './index/index-admin/cad-prod/cad-prod.component';
import { ListarProdComponent } from './index/index-admin/listar-prod/listar-prod.component';
import { ListarAdmComponent } from './index/index-admin/listar-adm/listar-adm.component';
import { DoacoesComponent } from './index/index-admin/doacoes/doacoes.component';
import { ListarInstComponent } from './index/index-admin/listar-inst/listar-inst.component';
import { AuthGuardAdmService } from './autentication/services/authGuardAdm.service';
import { CadDoacaoComponent } from './index/index-doador/cad-doacao/cad-doacao.component';
import { AuthGuardDoadorService } from './autentication/services/authGuardDoador.service';
import { PropriasDoacoesComponent } from './index/index-doador/proprias-doacoes/proprias-doacoes.component';
import { DoacoesRecebidasComponent } from './index/index-instituicao/doacoes-recebidas/doacoes-recebidas.component';
import { AuthGuardInstService } from './autentication/services/authGuardInst.service';
import { DoacoesConfirmComponent } from './index/index-instituicao/doacoes-confirm/doacoes-confirm.component';
import { ListDoadoresComponent } from './index/index-admin/list-doadores/list-doadores.component';
import { DoacoesNaoConfComponent } from './index/index-doador/doacoes-nao-conf/doacoes-nao-conf.component';
import { DefiniPrioridadeComponent } from './index/index-instituicao/defini-prioridade/defini-prioridade.component';
import { MostrarPrioridadeComponent } from './index/index-instituicao/mostrar-prioridade/mostrar-prioridade.component';




const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registrar-doador', component: RegistroDoadorComponent },

    { 
        path: 'index-instituicao', 
        component: IndexInstituicaoComponent,
        canActivate: [AuthGuardInstService],
        children: [
            {
                path: 'doacoes-receb',
                component: DoacoesRecebidasComponent,
            }, {
                path: 'doacoes-confirm',
                component: DoacoesConfirmComponent,
            }, {
                path: 'prod-prioridade',
                component: DefiniPrioridadeComponent,
            }, {
                path: 'list-prioridade',
                component: MostrarPrioridadeComponent,
            }
        ]
    },  

    { 
        path: 'index-doador', 
        component: IndexDoadorComponent,
        canActivate: [AuthGuardDoadorService],
        children: [
            {
                path: 'registrar-doacao',
                component: CadDoacaoComponent
            }, {
                path: 'ver-suas-doacoes', 
                component: PropriasDoacoesComponent
            }, {
                path: 'doacoes-nao-confirmadas', 
                component: DoacoesNaoConfComponent
            }
        ]
         
    },

    
    { 
        path: 'index-admin', 
        component: IndexAdminComponent,
        canActivate: [AuthGuardAdmService],
        children: [
            {
                path: 'registrar-adm',
                component: RegistroAdmComponent
            }, {
                path: 'registrar-inst', 
                component: RegistroInstComponent
            }, {
                path: 'registrar-prod',
                component: CadProdComponent
            }, {
                path: 'lista-prod',
                component: ListarProdComponent
            }, {
                path: 'lista-adm',
                component: ListarAdmComponent
            }, {
                path: 'doacoes',
                component: DoacoesComponent
            }, {
                path: 'lista-inst',
                component: ListarInstComponent
            }, {
                path: 'lista-doadores',
                component: ListDoadoresComponent
            }
        ]
         
    },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule{

}
