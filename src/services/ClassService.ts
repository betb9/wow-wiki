import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Class, ClassesList, ClassMedia, ClassPVPTalent } from '@/utils/ClassesTypes';

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

/**
 * Return a class from BNet API for given classID
 * @param oauthClient
 * @param classId
 * @param parameters
 * @return Promise<Class>
 */
async function getClass(oauthClient: AxiosInstance, classId: number, parameters?: AxiosRequestConfig): Promise<Class> {
  const response: AxiosResponse<Class> = await oauthClient.get<Class>(`/data/wow/playable-class/${classId}`, parameters);
  return response.data;
}

/**
 * Return media for given classId
 * @param oauthClient
 * @param classId
 * @param parameters
 * @return Promise<ClassMedia>
 */
async function getClassMedia(oauthClient: AxiosInstance, classId: number, parameters?: AxiosRequestConfig): Promise<ClassMedia> {
  const response: AxiosResponse<ClassMedia> = await oauthClient.get<ClassMedia>(`/data/wow/media/playable-class/${classId}`, parameters);
  return response.data;
}

/**
 * Return slots for pvp talent for the given classId
 * @param oauthClient
 * @param classId
 * @param parameters
 */
async function getClassPVPTalentSlots(
  oauthClient: AxiosInstance,
  classId: number,
  parameters?: AxiosRequestConfig
): Promise<ClassPVPTalent> {
  const response: AxiosResponse<ClassPVPTalent> = await oauthClient.get<ClassPVPTalent>(
    `/data/wow/playable-class/${classId}/pvp-talent-slots`,
    parameters
  );
  return response.data;
}

export function useClassService() {
  return {
    getClassesList,
    getClass,
    getClassMedia,
    getClassPVPTalentSlots
  };
}
