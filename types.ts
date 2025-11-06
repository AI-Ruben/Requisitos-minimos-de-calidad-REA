
export interface Criterion {
  name: string;
  items: string[];
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
