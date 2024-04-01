import axios from 'axios';

function isApiResponse(data: unknown): data is API.Response {
    const d = data as API.Response;

    return d.error !== undefined || d.data !== undefined;
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
    transformResponse(response) {
        const data = JSON.parse(response);

        if (isApiResponse(data)) {
            if (data.error !== undefined) {
                return data.error;
            }

            return data.data;
        }
    },
});
