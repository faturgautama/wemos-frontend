export namespace AuthenticationModel {
    export interface ILogin {
        email: string;
        password: string;
    }

    export interface IRegister {
        full_name: string;
        phone_number: string;
        email: string;
        password: string;
    }

    export interface IUser {
        id_user: string;
        full_name: string;
        phone_number: string;
        email: string;
        device: IDevice[]
    }

    export interface IDevice {
        id_device: string;
        device_name: string;
        device_code: string;
        created_at: Date;
        is_connected: boolean;
    }
}