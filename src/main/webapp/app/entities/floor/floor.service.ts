import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Floor } from './floor.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Floor>;

@Injectable()
export class FloorService {

    private resourceUrl =  SERVER_API_URL + 'api/floors';

    constructor(private http: HttpClient) { }

    create(floor: Floor): Observable<EntityResponseType> {
        const copy = this.convert(floor);
        return this.http.post<Floor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(floor: Floor): Observable<EntityResponseType> {
        const copy = this.convert(floor);
        return this.http.put<Floor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Floor>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Floor[]>> {
        const options = createRequestOption(req);
        return this.http.get<Floor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Floor[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Floor = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Floor[]>): HttpResponse<Floor[]> {
        const jsonResponse: Floor[] = res.body;
        const body: Floor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Floor.
     */
    private convertItemFromServer(floor: Floor): Floor {
        const copy: Floor = Object.assign({}, floor);
        return copy;
    }

    /**
     * Convert a Floor to a JSON which can be sent to the server.
     */
    private convert(floor: Floor): Floor {
        const copy: Floor = Object.assign({}, floor);
        return copy;
    }
}
