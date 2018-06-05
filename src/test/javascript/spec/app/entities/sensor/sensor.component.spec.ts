/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { SensorComponent } from '../../../../../../main/webapp/app/entities/sensor/sensor.component';
import { SensorService } from '../../../../../../main/webapp/app/entities/sensor/sensor.service';
import { Sensor } from '../../../../../../main/webapp/app/entities/sensor/sensor.model';

describe('Component Tests', () => {

    describe('Sensor Management Component', () => {
        let comp: SensorComponent;
        let fixture: ComponentFixture<SensorComponent>;
        let service: SensorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [SensorComponent],
                providers: [
                    SensorService
                ]
            })
            .overrideTemplate(SensorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SensorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Sensor(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sensors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
