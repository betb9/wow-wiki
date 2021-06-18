import { BNetLink, BNetRef, BNetSelf } from '@/utils/types';

export interface ClassesList {
  _links: BNetSelf;
  classes: Array<BNetRef>;
}

export interface Class {
  _links: BNetSelf;
  id: number;
  name: string;
  gender_name: Record<string, string>;
  power_type: BNetRef;
  specializations: Array<BNetRef>;
  media: BNetRef;
  pvp_talent_slots: BNetLink;
}

export interface ClassMedia {
  _links: BNetSelf;
  assets: Array<Record<string, string | number>>;
  id: number;
}
