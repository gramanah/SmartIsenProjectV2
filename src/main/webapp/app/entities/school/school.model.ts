import { BaseEntity } from './../../shared';

export class School implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public buildings?: BaseEntity[],
        public floors?: BaseEntity[],
    ) {
    }
}
