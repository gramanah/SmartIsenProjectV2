import { BaseEntity } from './../../shared';

export class Floor implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public active?: boolean,
        public school?: BaseEntity,
        public rooms?: BaseEntity[],
    ) {
        this.active = false;
    }
}
