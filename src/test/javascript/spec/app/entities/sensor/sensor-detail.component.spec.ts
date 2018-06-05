/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { SensorDetailComponent } from '../../../../../../main/webapp/app/entities/sensor/sensor-detail.component';
import { SensorService } from '../../../../../../main/webapp/app/entities/sensor/sensor.service';
import { Sensor } from '../../../../../../main/webapp/app/entities/sensor/sensor.model';

describe('Component Tests', () => {

    describe('Sensor Management Detail Component', () => {
        let comp: SensorDetailComponent;
        let fixture: ComponentFixture<SensorDetailComponent>;
        let service: SensorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [SensorDetailComponent],
                providers: [
                    SensorService
                ]
            })
            .overrideTemplate(SensorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SensorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Sensor(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sensor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
