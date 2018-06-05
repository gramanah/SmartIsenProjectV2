/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { FloorDetailComponent } from '../../../../../../main/webapp/app/entities/floor/floor-detail.component';
import { FloorService } from '../../../../../../main/webapp/app/entities/floor/floor.service';
import { Floor } from '../../../../../../main/webapp/app/entities/floor/floor.model';

describe('Component Tests', () => {

    describe('Floor Management Detail Component', () => {
        let comp: FloorDetailComponent;
        let fixture: ComponentFixture<FloorDetailComponent>;
        let service: FloorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [FloorDetailComponent],
                providers: [
                    FloorService
                ]
            })
            .overrideTemplate(FloorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FloorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FloorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Floor(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.floor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
