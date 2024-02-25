# Configuring Component Maker

Customizing Component Maker to suit your development needs is straightforward. Here's how you can adjust templates and settings to match your project's requirements:


## Customizing Templates folder

1. Navigate to the `.cm_templates` directory in your project.
    * you can always rename the folder as you want
2. Modify existing templates or add new ones to create components that align with your coding standards and project structure.

This is a **React/Typescript** example :

```text
├───component
│   └───_var_
│           index.ts
│           _var_.tsx
└───page
    └───_var_.tsx
``` 

3. Template Folders within `.cm_templates`

    Each folder located under the `.cm_templates` directory acts as a distinct template container. These folders are designed to hold the template files and configurations necessary for generating specific components within your project.

## Template File Content

The content of each file within a template folder plays a crucial role in defining the structure and content of the components you generate. These template files should include placeholders or variables that will be replaced with specific values when a component is generated. This allows for dynamic generation of component files tailored to your specific requirements.

### variables and content

- **Variables** are defined within your template files using a specific syntax (e.g., `_variableName_`) that Component Maker recognizes and replaces with actual values provided during the component generation process.

**This variable is substituted with the designated value within both the contents of the files and their paths.**

  ::: warning
  Currently, the system uses a singular variable, the component name.
  :::
 
### Example Template File

Consider a template file for a React component named `_var_.jsx`:

```jsx
import React from 'react';
interface I_var_Props {
  text: string;
}
function _var_({ text }: I_var_Props) {
  return <div>{text}</div>;
}
export default _var_;

```

Given the input "**UIButton**" for the variable, the system will generate a component file named UIButton.tsx, containing the following code:

```jsx
import React from 'react';
interface IUIButtonProps {
  text: string;
}
function UIButton({ text }: IUIButtonProps) {
  return <div>{text}</div>;
}
export default UIButton;

```