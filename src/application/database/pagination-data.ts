export interface PaginationInput {
  page: number;
  itemsPerPage?: number;
}

export interface PaginationOutput<Entity> {
  page: number;
  itemsPerPage?: number;
  items: Entity[];
  totalItems: number;
  totalPages: number;
}

export const ITEMS_PER_PAGE = 10;
