import type { API_FilterFunction, IndexEntry } from "storybook/internal/types";

export interface Result {
  divs: DOMRect[];
  styled: DOMRect[];
}

export interface Persona {
  id: string;
  /**
   * User visible name of this persona
   */
  name: string;
  /**
   * Only include items with matching types
   */
  types?: IndexEntry["type"][];
  /**
   * Only include stories with the following tags
   */
  tags?: string[];
  /**
   * Custom filter function
   */
  filter?: API_FilterFunction;
}
