export declare const CallToAction: {
    slug: string;
    labels: {
        singular: string;
        plural: string;
    };
    fields: ({
        name: string;
        label: string;
        type: string;
        options: {
            label: string;
            value: string;
        }[];
        defaultValue: string;
        required?: undefined;
        minRows?: undefined;
        maxRows?: undefined;
        fields?: undefined;
    } | {
        name: string;
        type: string;
        required: boolean;
        label?: undefined;
        options?: undefined;
        defaultValue?: undefined;
        minRows?: undefined;
        maxRows?: undefined;
        fields?: undefined;
    } | {
        name: string;
        label: string;
        type: string;
        minRows: number;
        maxRows: number;
        fields: ({
            name: string;
            type: string;
            required: boolean;
            options?: undefined;
            defaultValue?: undefined;
        } | {
            name: string;
            type: string;
            options: {
                label: string;
                value: string;
            }[];
            defaultValue: string;
            required?: undefined;
        })[];
        options?: undefined;
        defaultValue?: undefined;
        required?: undefined;
    })[];
};
export default CallToAction;
