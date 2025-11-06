
export interface Item {
  text: string;
  description: string;
}

export interface Criterion {
  name: string;
  items: Item[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  criteria: Criterion[];
}

export interface CheckedItems {
  [key: string]: boolean;
}

export interface CategoryStats {
  [key: string]: {
    checked: number;
    total: number;
  };
}