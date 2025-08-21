import React, { memo } from "react";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "storybook/internal/components";
import { UsersIcon } from "@storybook/icons";
import type { Persona } from "../types";

export const PersonaSwitcher = memo(
  ({
    persona,
    personas,
    onPersonaChange,
  }: {
    persona?: string;
    personas: Persona[];
    onPersonaChange: (persona: string) => void;
  }) => {
    const activePersona = personas.find(({ id }) => id === persona);
    return (
      <WithTooltip
        placement="bottom"
        tooltip={({ onHide }) => (
          <TooltipLinkList
            links={personas.map(({ id, name }) => ({
              key: id,
              id: id,
              title: name,
              active: id === persona,
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
          {activePersona?.name}
        </IconButton>
      </WithTooltip>
    );
  },
);
