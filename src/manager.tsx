import React from "react";
import { addons, types } from "storybook/manager-api";
import { PersonaSwitcher } from "./components/PersonaSwitcher";
import { ADDON_ID, CONFIG_KEY, STORAGE_KEY, TOOL_ID } from "./constants";
import defaultPersonas from "./defaultPersonas";
import type { API_FilterFunction } from "storybook/internal/types";
import type { Persona } from "./types";

function filter(personaId: string): API_FilterFunction {
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
  const { [CONFIG_KEY]: personas = defaultPersonas } = addons.getConfig() as {
    [CONFIG_KEY]: Persona[];
  };
  const initialPersona = localStorage.getItem(STORAGE_KEY) || personas[0]?.id;
  if (initialPersona) {
    void api.experimental_setFilter(ADDON_ID, filter(initialPersona));
  }

  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Persona switcher",
    render: () => (
      <PersonaSwitcher
        persona={localStorage.getItem(STORAGE_KEY) || personas[0]?.id}
        personas={personas}
        onPersonaChange={(persona) => {
          localStorage.setItem(STORAGE_KEY, persona);
          void api.experimental_setFilter(ADDON_ID, filter(persona));
        }}
      />
    ),
  });
});
