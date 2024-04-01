import isObject from './isObject';

function getPaths(obj: Record<string, unknown>) {
    const paths: Record<string, string> = {};

    function recursive(obj: Record<string, unknown>, path = '') {
        for (const key in obj) {
            const value = obj[key];

            if (isObject(value)) {
                recursive(value, path === '' ? key : `${path}.${key}`);
            } else {
                paths[key] = path === '' ? key : `${path}.${key}`;
            }
        }
    }

    recursive(obj);

    return paths;
}

export default getPaths;
