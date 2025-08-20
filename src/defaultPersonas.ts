import type { Persona } from "./types";

export default [
  {
    id: "default",
    name: "Default",
    docs: true,
    story: false,
  },
  {
    id: "dev",
    name: "Dev",
    docs: true,
    story: true,
    tags: ["dev"],
  },
  {
    id: "qa",
    name: "QA",
    docs: true,
    story: true,
  },
] satisfies Persona[];
