/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { BuildingComponent } from '../../../../../../main/webapp/app/entities/building/building.component';
import { BuildingService } from '../../../../../../main/webapp/app/entities/building/building.service';
import { Building } from '../../../../../../main/webapp/app/entities/building/building.model';

describe('Component Tests', () => {

    describe('Building Management Component', () => {
        let comp: BuildingComponent;
        let fixture: ComponentFixture<BuildingComponent>;
        let service: BuildingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [BuildingComponent],
                providers: [
                    BuildingService
                ]
            })
            .overrideTemplate(BuildingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BuildingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuildingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Building(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.buildings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
