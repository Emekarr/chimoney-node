export interface Options {
  limit?: number;
  orderBy?: {
    field: string;
    direction: "asc" | "desc";
  };
  startAfter?: string;
  filter?: {
    field: string;
    operation: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
    value: string;
  }[];
}
