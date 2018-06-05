import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Sensor } from './sensor.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Sensor>;

@Injectable()
export class SensorService {

    private resourceUrl =  SERVER_API_URL + 'api/sensors';

    constructor(private http: HttpClient) { }

    create(sensor: Sensor): Observable<EntityResponseType> {
        const copy = this.convert(sensor);
        return this.http.post<Sensor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sensor: Sensor): Observable<EntityResponseType> {
        const copy = this.convert(sensor);
        return this.http.put<Sensor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Sensor>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Sensor[]>> {
        const options = createRequestOption(req);
        return this.http.get<Sensor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Sensor[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Sensor = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Sensor[]>): HttpResponse<Sensor[]> {
        const jsonResponse: Sensor[] = res.body;
        const body: Sensor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Sensor.
     */
    private convertItemFromServer(sensor: Sensor): Sensor {
        const copy: Sensor = Object.assign({}, sensor);
        return copy;
    }

    /**
     * Convert a Sensor to a JSON which can be sent to the server.
     */
    private convert(sensor: Sensor): Sensor {
        const copy: Sensor = Object.assign({}, sensor);
        return copy;
    }
}
