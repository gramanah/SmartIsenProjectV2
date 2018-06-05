import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Temperature } from './temperature.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Temperature>;

@Injectable()
export class TemperatureService {

    private resourceUrl =  SERVER_API_URL + 'api/temperatures';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(temperature: Temperature): Observable<EntityResponseType> {
        const copy = this.convert(temperature);
        return this.http.post<Temperature>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(temperature: Temperature): Observable<EntityResponseType> {
        const copy = this.convert(temperature);
        return this.http.put<Temperature>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Temperature>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Temperature[]>> {
        const options = createRequestOption(req);
        return this.http.get<Temperature[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Temperature[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Temperature = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Temperature[]>): HttpResponse<Temperature[]> {
        const jsonResponse: Temperature[] = res.body;
        const body: Temperature[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Temperature.
     */
    private convertItemFromServer(temperature: Temperature): Temperature {
        const copy: Temperature = Object.assign({}, temperature);
        copy.time = this.dateUtils
            .convertLocalDateFromServer(temperature.time);
        return copy;
    }

    /**
     * Convert a Temperature to a JSON which can be sent to the server.
     */
    private convert(temperature: Temperature): Temperature {
        const copy: Temperature = Object.assign({}, temperature);
        copy.time = this.dateUtils
            .convertLocalDateToServer(temperature.time);
        return copy;
    }
}
