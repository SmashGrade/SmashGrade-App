import { ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';

// Function to format array of objects to a string
export function formatArrayToString<T>(data: T[], property: keyof T): string {
    if (!data) {
        return '';
    }
    return data.map((item) => item[property]).join(', ');
}

// export function getValueGetter<T, K extends keyof T, L extends keyof T[K]>(
//     parentProperty: K,
//     childProperty: L
// ): ValueGetterFunc<T, typeof K> {
//     return function (params: ValueGetterParams<T>) {
//         if (!params.data || !Array.isArray(params.data)) {
//             return '';
//         }
//         const data = params.data[parentProperty];
//         return formatArrayToString(data, childProperty);
//     };
// }

export function getValueGetter<T, K extends keyof T>(parentProperty: K, childProperty: string): ValueGetterFunc<T, K> {
    // @ts-expect-error Will fix later
    return function (params: ValueGetterParams<T, K>) {
        if (!params.data || !Array.isArray(params.data[parentProperty])) {
            return '';
        }
        const data = params.data[parentProperty] as Record<string, never>[];
        return formatArrayToString(data, childProperty);
    };
}
