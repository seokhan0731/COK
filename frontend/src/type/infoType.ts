export interface HubItem {
  id: number;
  type: ItemType;
  name: string;
  description: string;
  subItems?: string[];
  issuer?: string;
}

export interface DetailModalProps {
    item: HubItem;
    onClose: () => void;
}

export type GetHubResponseType = { items: HubItem[] };

export type ItemType = "job" | "certification";
