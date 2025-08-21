import React, { memo } from "react";
import { type API, useGlobals } from "storybook/manager-api";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "storybook/internal/components";
import { CONFIG_KEY, PARAM_KEY, TOOL_ID } from "../constants";
import { UsersIcon } from "@storybook/icons";
import { addons } from "storybook/manager-api";
import type { Persona } from "../types";
import defaultPersonas from "../defaultPersonas";

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const [globals, updateGlobals] = useGlobals();

  const currentPersona = globals[PARAM_KEY];

  const { [CONFIG_KEY]: personas = defaultPersonas } = addons.getConfig() as {
    [CONFIG_KEY]: Persona[];
  };

  return (
    <WithTooltip
      key={TOOL_ID}
      placement="bottom"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={personas.map(({ id, name }) => ({
            key: id,
            id: id,
            title: name,
            active: id === currentPersona,
            onClick() {
              updateGlobals({ [PARAM_KEY]: id });
              onHide();
            },
          }))}
        />
      )}
    >
      <IconButton title="Switch persona">
        <UsersIcon />
      </IconButton>
    </WithTooltip>
  );
});
