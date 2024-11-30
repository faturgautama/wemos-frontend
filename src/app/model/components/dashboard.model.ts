export namespace DashboardModel {
    export interface IProps {
        id: string;
        button?: IButton;
    }

    export interface IButton {
        id: string;
        icon: string;
        caption: string;
    }
}