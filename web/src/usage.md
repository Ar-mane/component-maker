# Usage 

## Guide for Component Maker

The Component Maker extension for Visual Studio Code simplifies the process of creating new components in your project. This guide will walk you through the steps to utilize this extension effectively.

## Generating a New Component

Component Maker integrates seamlessly into your VS Code environment, offering an intuitive interface for generating components. Here's how to use it:

### Using the Right-Click Menu

1. **Open Your Project**: Start by opening your project in Visual Studio Code where you intend to add a new component.

2. **Navigate to the Desired Location**: In the File Explorer pane, navigate to the directory where you want to create the new component.

3. **Right-Click to Open the Context Menu**: Right-click on the folder or in the empty space within the folder where the component should be created.

4. **Select `Make Component`**: In the context menu, look for the `📐Make Component` option (the actual text might vary based on your extension's settings). Clicking this option will initiate the component creation process.


    ![](/images/menu.jpg)
5. **Template Selection**: If you have multiple templates configured, you may be asked to select the template you want to use for this component. Choose the appropriate template that matches the type of component you're creating.

    ![](/images/template.png)

6. **Auto generation config**: For first-time users without an existing configuration in their workspace, a dialog will pop up at the bottom, asking for permission to automatically set up the workspace. This auto-setup process includes creating a template folder and generating a .cmrc.json configuration file.

    ![](/images/no_template.png)

7. **Enter Component Name**: A prompt will appear asking you to enter the name for your new component. Type in the desired name and press Enter. The naming convention you should follow will depend on your project's standards.

8. **Component Creation**: After you've entered the name and selected the template, the extension will generate the new component files at the specified location, following the structure defined in the template.

## Customizing Templates

For information on how to customize or create new templates to suit your project's requirements, refer to the [Configurations guide](/configurations).

## Troubleshooting

If you encounter any issues while using the Component Maker extension, check the [Github issues](https://github.com/Ar-mane/component-maker/issues) for solutions to common problems or contact support for further assistance.
