import { Config, Template } from '@/config/types';

function getRelativePathsFromTemplate(config: Config, template: Template): string[] {
  const paths: string[] = [`${config.dir}/${template.templateDir}`];

  if (template.files) {
    template.files.forEach((file) => {
      paths.push(`${config.dir}/${template.templateDir}/${file.sourceFile}`);
    });
  }
  if (template.effects) {
    template.effects.forEach((effect) => {
      paths.push(effect.file);
    });
  }
  return paths;
}

export function getAllTemplateFilePaths(config: Config): string[] {
  const paths: string[] = [config.dir];

  config.templates.forEach((template) => {
    paths.push(...getRelativePathsFromTemplate(config, template));
  });

  return paths;
}
