import React, { memo } from "react";
import { addons } from "storybook/manager-api";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "storybook/internal/components";
import { CONFIG_KEY, CONFIG_STATE_KEY, TOOL_ID } from "../constants";
import { UsersIcon } from "@storybook/icons";
import type { Persona } from "../types";
import defaultPersonas from "../defaultPersonas";

export const Tool = memo(function MyAddonSelector({
  onPersonaChange,
}: {
  onPersonaChange: (persona: string) => void;
}) {
  const {
    [CONFIG_KEY]: personas = defaultPersonas,
    [CONFIG_STATE_KEY]: currentPersona = defaultPersonas[0]!.id,
  } = addons.getConfig() as {
    [CONFIG_KEY]: Persona[];
    [CONFIG_STATE_KEY]: string;
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
              onPersonaChange(id);
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
