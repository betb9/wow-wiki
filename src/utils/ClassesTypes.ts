import { BNetApiResponse, BNetLink, BNetRef } from '@/utils/types';

export interface ClassesList extends BNetApiResponse {
  classes: Array<BNetRef>;
}

export interface Class extends BNetApiResponse {
  id: number;
  name: string;
  gender_name: Record<string, string>;
  power_type: BNetRef;
  specializations: Array<BNetRef>;
  media: BNetRef;
  pvp_talent_slots: BNetLink;
}

export interface ClassMedia extends BNetApiResponse {
  assets: Array<Record<string, string | number>>;
  id: number;
}

export interface ClassPVPTalent extends BNetApiResponse {
  talent_slots: Array<Record<string, number>>;
}
