import { HttpBaseResponse } from "src/app/services/http-operation.service"

export namespace LogModel {
    export interface ILog {
        id_tumbler_log: number
        date_time: string
        id_customer: number
        full_name: string
        device_id: string
        device_name: string
        device_type: string
        device_size: string
        device_notes: string
        initial_fill_litre: number
        total_fill_litre: number
        total_consume_litre: number
        fill?: ILogFill[]
        consume?: ILogConsume[]
    }

    export interface ILogFill {
        id_tumbler_log: number
        id_tumbler_fill_log: number
        litre: number
        note: string
        created_at: string
    }

    export interface ILogConsume {
        id_tumbler_log: number
        id_tumbler_consume_log: number
        litre: number
        note: string
        created_at: string
    }

    export interface ILogQuery {
        id_customer?: number;
        date_time?: string;
    }

    export class GetAll implements HttpBaseResponse {
        status!: boolean
        message!: string
        data!: ILog[]
    }

    export class GetById implements HttpBaseResponse {
        status!: boolean
        message!: string
        data!: ILog
    }
}