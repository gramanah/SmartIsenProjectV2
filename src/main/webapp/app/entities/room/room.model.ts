import { BaseEntity, User } from './../../shared';

export class Room implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public active?: boolean,
        public windows?: boolean,
        public door?: boolean,
        public heater?: boolean,
        public light?: boolean,
        public presence?: boolean,
        public globalTemperature?: number,
        public user?: User,
        public floor?: BaseEntity,
        public building?: BaseEntity,
        public sensors?: BaseEntity[],
    ) {
        this.active = false;
        this.windows = false;
        this.door = false;
        this.heater = false;
        this.light = false;
        this.presence = false;
    }
}
