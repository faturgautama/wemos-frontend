export namespace AuthenticationModel {
    export interface ILoginCustomer {
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
        token: string
    }

    export interface ILoginUser {
        id_user: number
        full_name: string
        email: string
        token: string
    }
}