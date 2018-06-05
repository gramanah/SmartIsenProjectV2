import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FloorComponent } from './floor.component';
import { FloorDetailComponent } from './floor-detail.component';
import { FloorPopupComponent } from './floor-dialog.component';
import { FloorDeletePopupComponent } from './floor-delete-dialog.component';

@Injectable()
export class FloorResolvePagingParams implements Resolve<any> {

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

export const floorRoute: Routes = [
    {
        path: 'floor',
        component: FloorComponent,
        resolve: {
            'pagingParams': FloorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Floors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'floor/:id',
        component: FloorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Floors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const floorPopupRoute: Routes = [
    {
        path: 'floor-new',
        component: FloorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Floors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'floor/:id/edit',
        component: FloorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Floors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'floor/:id/delete',
        component: FloorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Floors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
