#  Configuring `.cmrc`

**.cmrc** stands for **Component Maker Run Command**. It is automatically generated and should be placed at the root of your workspace. This file acts as the main entry for the extension, containing all the configurations for your templates.

### Path Specifications

::: danger Relative and Absolute Paths

When configuring your templates in Component Maker, it's crucial to understand the distinction between source and destination paths:

- **Source Paths**: These paths are always **relative** to the template directory. When specifying the location of your source files within a template, you should provide paths that are relative to the root of the template directory (`templateDir`) you're working within.

- **Destination Paths**: In contrast, destination paths must be specified as **absolute** paths within your project. These paths dictate exactly where the generated files will be placed in your project's directory structure, starting from the root of your project.

This distinction ensures that Component Maker can accurately locate your template files and place the generated files in the correct locations within your project.

:::

### Purpose and Importance

- **Central Configuration Hub**: `.cmrc` serves as the centralized location for managing your template configurations, simplifying the process of customizing and updating your component generation settings.

- **Flexibility and Customization**: This configuration file allows for the definition of various templates that cater to different needs within your project, ensuring that the generated components adhere to your project's structure and coding guidelines.

## Configuration Structure

The `.cmrc` file typically includes the following key elements:

#### `Config`

- `dir`: The folder where templates are stored. Default is `.cm_templates`.

- `templates`: List of templates to be used for operations.

#### `Template`

- `label`: Template label for display purposes.

- `detail`: Template details for additional information.

- `variable`: Variable interpolation, replaced by user input during the operation.

- `templateDir`: Directory name inside the template directory.

- `destinationDir`: Template destination directory (optional).

- `files`: List of files affected by the template operation.

- `effects`: File effects, such as post-updating a file.

#### `SpecialFile`

- `sourceFile`: Filename source, relative path.

- `destinationDir`: Directory destination, absolute path.

#### `Effect`

- `file`: Filename to update, absolute path.

- `action`: Action to apply, like edit.

- `concat`: Edit strategy: start or end.

- `content`: Content to add during the edit action.


## Example Configuration

Below is a configuration example for generating two **react/Next js** components using templates:
```json
{
  "$schema": "https://cm.armane.dev/schema.json",
  "dir": ".cm_templates",
  "templates": [
    {
      "label": "📄 add component",
      "detail": "to create a complete Next component",
      "templateDir": "component",
      "variable": "_var_"
    },
    {
      "label": "🗃️ add page",
      "detail": "to create a Next page",
      "templateDir": "page",
      "variable": "_var_",
      "destinationDir": "src/pages"
    }
  ]
}
```

### Example: Adding a New Template

To add a new template, you'll want to first create a template directory within `.cm_templates`. For example, let's create a template for generating a service layer in an application:

1. **Create a New Directory**: Inside `.cm_templates`, create a new directory named `service`.
2. **Add Template Files**: Within the `service` directory, add your template files. For instance, you might have `serviceName.service.ts` for defining the service structure.

Here’s how you can update your `.cmrc` to include this new template:

```json
{
  "dir": ".cm_templates",
  "templates": [
    ... // other templates
    {
      "label": "🔧 add service",
      "detail": "to create a service layer",
      "templateDir": "service",
      "variable": "_ServiceName_",
      "destinationDir": "src/services"
    }
  ]
}
```


In your template files, use the specified variable (like `_ServiceName_` in the example above) where you want the user’s input to replace content. When generating a component or service, Component Maker will prompt the user to enter a name, which will replace `_ServiceName_` throughout the template files.

## Advanced Configuration
- ### Special files
For more granular control over your generated components, Component Maker allows you to specify the destination for each file individually. This feature is particularly useful when your project has a specific structure for tests, styles, or other related files. Here’s how you can configure file destinations within your templates:

```json
{
  "dir": ".cm_templates",
  "templates": [
    ... // other templates
    {
      "label": "🔧 add service",
      "detail": "to create a service layer",
      "templateDir": "service",
      "variable": "_ServiceName_",
      "destinationDir": "src/services",
      "files": [
        {
          "sourceFile": "_ServiceName_.test.ts",
          "destinationDir": "src/test/services/_ServiceName_"
        }
        // Add more files as needed
      ],
    }
  ]
}
```
- ### Effects (`--experimental`)
For more advanced configurations, such as adding effects to update or modify other files upon generating a new component or service.
this functionnality can serve in backend projects when you need to register some components as dependencies or something 

```json
{
  "dir": ".cm_templates",
  "templates": [
    {
      "label": "🔧 add service",
      "detail": "to create a service layer",
      "templateDir": "service",
      "variable": "_ServiceName_",
      "destinationDir": "src/services",
      "effects": [
        {
          "action": "edit",
          "file": "src/app.ts",
          "concat": "end",
          "content": "import {_ServiceName_} from './services/_ServiceName_.service';"
        }
      ]
    }
  ]
}
```

This advanced setup allows you to not only generate new files but also automatically update existing ones, streamlining the development process even further.

By configuring Component Maker to your project’s specific needs, you can significantly enhance your development workflow and maintain consistency across your codebase.
