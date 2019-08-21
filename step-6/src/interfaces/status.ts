export enum StatusType {
    SUCCESS = "success",
    ERROR = "error",
}
export enum StatusMessage {
    DATA_LOADED_SUCCESSFULLY="Data is loaded successfully",
    DATA_LOADED_FAILED="There was an error loading your data, make sure that the backend is available"
}
export interface Status {
    message: string,
    type: StatusType | undefined,
    visible: boolean
}