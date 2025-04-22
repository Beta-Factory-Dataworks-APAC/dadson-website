export declare const Video: {
    slug: string;
    labels: {
        singular: string;
        plural: string;
    };
    fields: ({
        name: string;
        label: string;
        type: string;
        required: boolean;
        options?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        label: string;
        type: string;
        required?: undefined;
        options?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        label: string;
        type: string;
        options: {
            label: string;
            value: string;
        }[];
        defaultValue: string;
        required?: undefined;
    })[];
};
export default Video;
