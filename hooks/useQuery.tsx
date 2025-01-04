import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

type Action = 'add' | 'remove' | 'replace'

export default function useQuery() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const params: any = new URLSearchParams(searchParams);

    const createQueryString = useCallback(
        (action: Action, name: string, value?: string) => {
            
            if (action === 'add') {
                const existingAddedParam = params.get(name);

                if (existingAddedParam) {
                    const values = [...existingAddedParam.split(','), value];
                    const queryString = `${name}=${values.join(',')}`;

                    return updateQueryParams(name, queryString);

                } else {
                    params.set(name, value)
                }
            }

            if (action === 'remove') {
                if (name && value) {
                    const paramValues = params.getAll(name).toString().split(',').filter((v: string) => v !== value);

                    if (!paramValues.length) {
                        params.delete(name);
                    } else {
                        return updateQueryParams(name, `${name}=${paramValues.join(',')}`);
                    }

                } else {
                    const allParamValues = Array.from(params.entries()).map((entry: any) => entry[1].split(',')).flat();

                    if (allParamValues.includes(name)) {
                        for (const [key, value] of params.entries()) {
                            if (value.split(',').includes(name)) {
                                const updatedQueryValues = value.split(',').filter((value: string) => value !== name);

                                if (!updatedQueryValues.length) {
                                    params.delete(key);

                                } else {
                                    return updateQueryParams(key, `${key}=${updatedQueryValues.join(',')}`);
                                }
                            }
                        }

                    } else {
                        params.delete(name);
                    }
                }
            }

            if (action === 'replace') {
                params.set(name, value)
            }

            return params.toString().replace(/%2C/g, ',')

        },
        [searchParams]
    )

    const updateQueryParams = (name: string, params: any) => {
        const existingParams = searchParams.toString().replace(/%2C/g, ',').split('&');

        if (existingParams.length > 1) {
            const updatedParamIndex = existingParams.findIndex(value => value.startsWith(name));
            existingParams.splice(updatedParamIndex, 1, params);

            return existingParams.join('&');
        } else {
            return params;
        }
    }

    // Get value for a param
    const get = (name: string) => {
        const params = searchParams.get(name)?.split(',')
        return params?.length === 1 ? params[0] : params;
    }

    // Adds a query param to the url
    const add = (name: string, value: string) => {
        router.push(pathname + '?' + createQueryString('add', name, value))
    }

    // Removes a query param from the url
    const remove = (name: string, value?: string) => {
        router.push(pathname + '?' + createQueryString('remove', name, value))
    }

    // Removes a query param from the url
    const replace = (name: string, value: string) => {
        if (!value) {
            router.push(pathname + '?' + createQueryString('remove', name))
            return
        }
        router.push(pathname + '?' + createQueryString('replace', name, value))
    }

    const path = pathname;

    // Checks if a param is a certain value
    const is = (name: string, value: string) => {
        return params.get(name) === value;
    }

    // Checks if a param includes a certain value
    const includes = (name: string, value: string) => {
        return params.get(name).split(',').includes(value);
    }

    const toggle = (name: string, value: string) => {
        const params = searchParams.get(name);
        params === value ? remove(name, value) : replace(name, value)
    }

    return {
        get,
        add,
        remove,
        replace,
        is,
        includes,
        path,
        toggle
    }
}

