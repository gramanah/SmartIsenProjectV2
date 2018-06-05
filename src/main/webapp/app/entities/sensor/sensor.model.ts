import { BaseEntity } from './../../shared';

export class Sensor implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public macAdress?: string,
        public room?: BaseEntity,
    ) {
    }
}
