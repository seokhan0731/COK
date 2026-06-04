import { AxiosError } from 'axios';
import type { GetHubResponseType, ItemType } from '../type/infoType';
import { authClient } from '../util/client';

export const getHubApi = async (
    type?: ItemType,
    signal?: AbortSignal,
): Promise<GetHubResponseType> => {
    console.log('[hub] GET /hub 요청 시작, type:', type ?? '(전체)');
    try {
        const res = await authClient.get<GetHubResponseType>('/hub', {
            params: type ? { type } : undefined,
            signal,
        });
        console.log('[hub] 전체 응답 data:', res.data);
        return res.data;
    } catch (e) {
        const err = e as AxiosError;
        console.error('[hub] 실패:', err.response?.status, err.response?.data ?? err.message);
        throw e;
    }
};