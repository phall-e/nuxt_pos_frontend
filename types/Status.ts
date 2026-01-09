export enum ModuleStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

const statuses = Object.values(ModuleStatus);

export default statuses;