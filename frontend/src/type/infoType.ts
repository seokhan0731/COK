export interface SubItem {
  name: string;
}

export interface HubItem {
  id: number;
  type: ItemType;
  name: string;
  description: string;
  subItems?: SubItem[];
  issuer?: string;
}

export interface DetailModalProps {
    item: HubItem;
    onClose: () => void;
}


export type ItemType = "job" | "certification";
