/**
 * Configuration interface for a tool that utilizes templates for various operations.
 */
export interface Config {
  /**
   * The folder where templates are stored. Default is '.cm_templates'.
   * @TJS-type string
   */
  dir: string;

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
   * Directory name inside the template directory. Example: '.cm_templates/component' ==> D = 'component'.
   */
  templateDir: string;

  /**
   * Variable interpolation: It can be a directory name, a file name, or content in a file.
   * It is replaced by user input during the operation.
   */
  variable: string;

  /**
   * Template destination directory. Some templates may require a specific directory.
   * Provide a directory if needed (optional). If absent, the default directory is the directory clicked.
   */
  destinationDir?: string;

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
  sourceFile: string;

  /**
   * directory destination, absolute path starting from your workspace root.
   * Example: `src/pages`.
   */
  destinationDir: string;
}

/**
 * Interface representing an effect to be applied after the template operation on files.
 */
export interface Effect {
  /**
   * Filename to update, absolute path starting from your workspace root.
   * Example: `src/service/dependency-injection.ext`.
   */
  file: string;

  /**
   * Action to apply, like edit.
   */
  action: 'edit';

  /**
   * Edit strategy: start | end. Append a line at the start or the end of the file.
   */
  concat: 'start' | 'end';

  /**
   * Content to add during the edit action.
   * Example : content = '// serviceRegister.singleton(new _ComponentName_Service())'
   */
  content: string;
}
