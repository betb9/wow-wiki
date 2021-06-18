import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassesList } from '@/utils/ClassesTypes';

/**
 * Return all Classes from BNet API
 * @param oauthClient: AxiosInstance
 * @param parameters: AxiosRequestConfig
 * @return Promise<ClassesList>
 */
async function getClassesList(oauthClient: AxiosInstance, parameters?: AxiosRequestConfig): Promise<ClassesList> {
  const response: AxiosResponse<ClassesList> = await oauthClient.get<ClassesList>('/data/wow/playable-class/index', parameters);
  return response.data;
}

export function useClassService() {
  return {
    getClassesList
  };
}
