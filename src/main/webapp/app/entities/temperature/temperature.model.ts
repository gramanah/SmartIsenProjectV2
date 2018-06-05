import { BaseEntity } from './../../shared';

export class Temperature implements BaseEntity {
    constructor(
        public id?: number,
        public value?: number,
        public time?: any,
        public sensor?: BaseEntity,
    ) {
    }
}
