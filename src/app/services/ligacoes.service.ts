import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import { environment } from "../../environments/environment";
import { Ligacoes } from '../models/ligacoes.model';

@Injectable()
export class LigacoesService {

    private ligacoesChartUrl: string = `${environment.url}/api/encuesta`;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http
    ) { }

    getChart1(filter: Ligacoes) {
        const url = `${this.ligacoesChartUrl}/chart1`;
        return this.http
            .get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getChart2(filter: Ligacoes) {
        const url = `${this.ligacoesChartUrl}/chart2`;
        return this.http
            .post(url, JSON.stringify(filter), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    getChart3(filter: Ligacoes) {
        const url = `${this.ligacoesChartUrl}/chart3`;
        return this.http
            .post(url, JSON.stringify(filter), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    getChart4(filter: Ligacoes) {
        const url = `${this.ligacoesChartUrl}/chart4`;
        return this.http
            .post(url, JSON.stringify(filter), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }
  

}
