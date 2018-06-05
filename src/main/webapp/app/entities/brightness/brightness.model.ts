import { BaseEntity } from './../../shared';

export class Brightness implements BaseEntity {
    constructor(
        public id?: number,
        public value?: number,
        public time?: any,
    ) {
    }
}
