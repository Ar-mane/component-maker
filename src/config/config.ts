import { Config } from "./types";

export const defaultConfig: Config = {
  templateFolder: ".templates",
  templates: [
    {
      label: "📄 add component",
      detail: "to create a complete next component",
      rootFolder: "component",
      variable: "_ComponentName_",
    },
    {
      label: "🗃️ add service",
      detail: "to create a dotnet service",
      rootFolder: "page",
      variable: "_ComponentName_",
    },
  ],
};
