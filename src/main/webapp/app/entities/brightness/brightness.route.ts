import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BrightnessComponent } from './brightness.component';
import { BrightnessDetailComponent } from './brightness-detail.component';
import { BrightnessPopupComponent } from './brightness-dialog.component';
import { BrightnessDeletePopupComponent } from './brightness-delete-dialog.component';

@Injectable()
export class BrightnessResolvePagingParams implements Resolve<any> {

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

export const brightnessRoute: Routes = [
    {
        path: 'brightness',
        component: BrightnessComponent,
        resolve: {
            'pagingParams': BrightnessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Brightnesses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'brightness/:id',
        component: BrightnessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Brightnesses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const brightnessPopupRoute: Routes = [
    {
        path: 'brightness-new',
        component: BrightnessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Brightnesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'brightness/:id/edit',
        component: BrightnessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Brightnesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'brightness/:id/delete',
        component: BrightnessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Brightnesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
