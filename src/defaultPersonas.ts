import type { Persona } from "./types";

const defaultPersonas: Persona[] = [
  {
    id: "default",
    name: "Default",
    types: ["docs"],
  },
  {
    id: "dev",
    name: "Dev",
    tags: ["dev"],
  },
  {
    id: "qa",
    name: "QA",
  },
];

export default defaultPersonas;
