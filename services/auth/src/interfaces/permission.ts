import { Entity } from "./entity";

export interface Permission extends Entity {
    name: string;
    displayName: string;
    entityName?: string;
    objectId?: string;
    canRead?: boolean;
    canCreate?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
}