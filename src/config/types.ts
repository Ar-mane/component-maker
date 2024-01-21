/**
 * Configuration interface for a tool that utilizes templates for various operations.
 */
export interface Config {
  /**
   * The folder where templates are stored. Default is '.templates'.
   * @TJS-type string
   */
  templateFolder: string;

  /**
   * List of templates to be used for operations.
   */
  templates: Template[];
}

/**
 * Interface representing a template for operations.
 */
export interface Template {
  /**
   * Template label for display purposes.
   */
  label: string;

  /**
   * Template details for additional information.
   */
  detail: string;

  /**
   * Folder name inside the template folder. Example: '.templates/component' ==> rootFolder = 'component'.
   */
  rootFolder: string;

  /**
   * Variable interpolation: It can be a folder name, a file name, or content in a file.
   * It is replaced by user input during the operation.
   */
  variable: string;

  /**
   * Template destination folder. Some templates may require a specific folder.
   * Provide the folder if needed (optional). If absent, the default destination is the folder clicked.
   */
  destination?: string;

  /**
   * If there are multiple destinations, provide a destination for each file (optional).
   */
  files?: SpecialFile[];

  /**
   * File effects, such as post-updating a file.
   */
  effects?: Effect[];
}

/**
 * Interface representing a file affected by the template operation.
 */
export interface SpecialFile {
  /**
   * Filename source, relative path. Example: `.templates/page/__componentName__.ext`, fileName: `__componentName__.ext`.
   */
  source: string;

  /**
   * Filename destination, absolute path starting from your workspace root.
   * Example: `src/pages/__componentName__.ext`.
   */
  destination: string;
}

/**
 * Interface representing an effect to be applied after the template operation on files.
 */
export interface Effect {
  /**
   * Filename source to update, absolute path starting from your workspace root.
   * Example: `src/service/dependency-injection.ext`.
   */
  source: string;

  /**
   * Action to apply, like edit.
   */
  action: "edit";

  /**
   * Edit strategy: start | end. Append a line at the start or the end of the file.
   */
  concat: "start" | "end";

  /**
   * Content to add during the edit action.
   */
  content: string;
}
