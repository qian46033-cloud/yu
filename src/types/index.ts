export type PageId = 'profile' | 'weibo' | 'services' | 'operations';

export interface ServiceItem {
  id: string;
  category: 'management' | 'promotion' | 'pr' | 'code' | 'planning';
  categoryTitle: string;
  title: string;
  priceTag: string;
  priceValue?: number;
  unit?: string;
  notes: string[];
  link?: string;
  recommended?: boolean;
}

export interface WeiboAccount {
  id: string;
  handle: string;
  url?: string;
  status: 'active' | 'incubating' | 'business';
  description: string;
  tag: string;
}
