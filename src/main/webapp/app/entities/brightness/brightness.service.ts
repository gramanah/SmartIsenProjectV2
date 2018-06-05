import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Brightness } from './brightness.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Brightness>;

@Injectable()
export class BrightnessService {

    private resourceUrl =  SERVER_API_URL + 'api/brightnesses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(brightness: Brightness): Observable<EntityResponseType> {
        const copy = this.convert(brightness);
        return this.http.post<Brightness>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(brightness: Brightness): Observable<EntityResponseType> {
        const copy = this.convert(brightness);
        return this.http.put<Brightness>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Brightness>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Brightness[]>> {
        const options = createRequestOption(req);
        return this.http.get<Brightness[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Brightness[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Brightness = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Brightness[]>): HttpResponse<Brightness[]> {
        const jsonResponse: Brightness[] = res.body;
        const body: Brightness[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Brightness.
     */
    private convertItemFromServer(brightness: Brightness): Brightness {
        const copy: Brightness = Object.assign({}, brightness);
        copy.time = this.dateUtils
            .convertLocalDateFromServer(brightness.time);
        return copy;
    }

    /**
     * Convert a Brightness to a JSON which can be sent to the server.
     */
    private convert(brightness: Brightness): Brightness {
        const copy: Brightness = Object.assign({}, brightness);
        copy.time = this.dateUtils
            .convertLocalDateToServer(brightness.time);
        return copy;
    }
}
