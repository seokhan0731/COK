import type { GetHubResponseType, ItemType } from '../type/HubType';
import { authClient } from '../util/client';

export const getHubApi = async (
    type?: ItemType,
    signal?: AbortSignal,
): Promise<GetHubResponseType> => {
    const { data } = await authClient.get<GetHubResponseType>('/hub', {
        params: type ? { type } : undefined,
        signal,
    });
    return data;
};
