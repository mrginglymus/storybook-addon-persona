import type { API_FilterFunction } from "storybook/internal/types";

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
   * Set false to hide docs for this persona
   *
   * @default true
   */
  story?: boolean;
  /**
   * Set false to hide stories for this persona
   *
   * @default true;
   */
  docs?: boolean;
  /**
   * Only include stories with the following tags
   */
  tags?: string[];
  /**
   * Custom filter function
   */
  filter?: API_FilterFunction;
}
