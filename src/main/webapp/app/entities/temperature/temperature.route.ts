import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TemperatureComponent } from './temperature.component';
import { TemperatureDetailComponent } from './temperature-detail.component';
import { TemperaturePopupComponent } from './temperature-dialog.component';
import { TemperatureDeletePopupComponent } from './temperature-delete-dialog.component';

@Injectable()
export class TemperatureResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const temperatureRoute: Routes = [
    {
        path: 'temperature',
        component: TemperatureComponent,
        resolve: {
            'pagingParams': TemperatureResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temperatures'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'temperature/:id',
        component: TemperatureDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temperatures'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const temperaturePopupRoute: Routes = [
    {
        path: 'temperature-new',
        component: TemperaturePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temperatures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'temperature/:id/edit',
        component: TemperaturePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temperatures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'temperature/:id/delete',
        component: TemperatureDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temperatures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
