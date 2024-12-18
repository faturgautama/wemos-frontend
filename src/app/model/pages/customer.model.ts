import { HttpBaseResponse } from "src/app/services/http-operation.service"

export namespace CustomerModel {
    export interface ICustomer {
        id_customer: number
        device_id: string
        device_name: string
        device_type: string
        device_size: string
        device_notes: string
        full_name: string
        date_of_birth: string
        weight: number
        height: number
        email: string
        password: string
        created_at: string
        created_by: number
        updated_at: string
        updated_by: number
        is_active: boolean
    }

    export class GetAll implements HttpBaseResponse {
        status!: boolean
        message!: string
        data!: ICustomer[]
    }

    export class GetById implements HttpBaseResponse {
        status!: boolean
        message!: string
        data!: ICustomer
    }

    export interface Create {
        device_id: string
        device_name: string
        device_type: string
        device_size: string
        device_notes: string
        full_name: string
        date_of_birth: string
        weight: number
        height: number
        email: string
        password: string
    }

    export interface Update {
        id_customer: number
        device_id: string
        device_name: string
        device_type: string
        device_size: string
        device_notes: string
        full_name: string
        date_of_birth: string
        weight: number
        height: number
        email: string
        password: string
        is_active: boolean
    }
}