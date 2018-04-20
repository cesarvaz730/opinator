import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import { environment } from "../../environments/environment";

@Injectable()
export class CombosService {

    private comoboUrl: string = `${environment.url}/api/ligacoes`;

    private headers = new Headers();
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http
    ) { }

    getAno() {
        const url = `${this.comoboUrl}/combo/ano`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getMes() {
        const url = `${this.comoboUrl}/combo/mesNum`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getSemana() {
        const url = `${this.comoboUrl}/combo/semanaMes`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getDia() {
        const url = `${this.comoboUrl}/combo/diaSemana`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getRede() {
        const url = `${this.comoboUrl}/combo/rede`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getRegional(rede: string) {
        const url = `${this.comoboUrl}/combos/regional/${rede}`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getAgencia(regional: string) {
        const url = `${this.comoboUrl}/combos/uniorg/${regional}`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getPorteAg(uniorg: string) {
        const url = `${this.comoboUrl}/combos/porte/${uniorg}`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getSegmento() {
        const url = `${this.comoboUrl}/combo/segmento`;
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

}
