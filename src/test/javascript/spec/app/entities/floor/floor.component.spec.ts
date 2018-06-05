/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { FloorComponent } from '../../../../../../main/webapp/app/entities/floor/floor.component';
import { FloorService } from '../../../../../../main/webapp/app/entities/floor/floor.service';
import { Floor } from '../../../../../../main/webapp/app/entities/floor/floor.model';

describe('Component Tests', () => {

    describe('Floor Management Component', () => {
        let comp: FloorComponent;
        let fixture: ComponentFixture<FloorComponent>;
        let service: FloorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [FloorComponent],
                providers: [
                    FloorService
                ]
            })
            .overrideTemplate(FloorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FloorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FloorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Floor(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.floors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
