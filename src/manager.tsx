import React from "react";
import { addons, types } from "storybook/manager-api";
import { Tool } from "./components/Tool";
import { ADDON_ID, CONFIG_KEY, PARAM_KEY, TOOL_ID } from "./constants";
import defaultPersonas from "./defaultPersonas";
import type { Globals } from "storybook/internal/csf";
import type { API_FilterFunction } from "storybook/internal/types";
import type { Persona } from "./types";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

function filter(personaId: Globals["persona"]): API_FilterFunction {
  const { [CONFIG_KEY]: personas = defaultPersonas } = addons.getConfig() as {
    [CONFIG_KEY]: Persona[];
  };
  const persona = personas.find((p) => p.id === personaId);

  if (!persona) {
    return () => true;
  }

  return function (item) {
    const matchesFilter = persona.filter?.(item) ?? true;

    const matchesType = persona.types?.includes(item.type) ?? true;

    const matchesTags =
      persona.tags?.some((t) => item.tags?.includes(t)) ?? true;

    return matchesFilter && matchesType && matchesTags;
  };
}

// Register the addon
addons.register(ADDON_ID, (api) => {
  void api.experimental_setFilter(ADDON_ID, filter("default"));
  api.on(
    GLOBALS_UPDATED,
    ({ globals: { [PARAM_KEY]: persona } }: { globals: Globals }) => {
      if (persona) {
        void api.experimental_setFilter(ADDON_ID, filter(persona));
      }
    },
  );
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Persona switcher",
    render: () => <Tool api={api} />,
  });
});
