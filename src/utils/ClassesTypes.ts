import { BNetLink, BNetRef, BNetSelf } from '@/utils/types';

export interface ClassesList {
  _links: BNetSelf;
  classes: Array<BNetRef>;
}
