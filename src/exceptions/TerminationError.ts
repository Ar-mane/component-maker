/* eslint-disable @typescript-eslint/naming-convention */
export enum TerminateReason {
  ComponentAlreadyExists = "ComponentAlreadyExists",
  NoUriProvided = "NoUriProvided",
  ConfigCreatedSuccessfully = "ConfigCreatedSuccessfully",
  ConfigCreationAborted = "ConfigCreationAborted",
  TemplateSelectionFailed = "TemplateSelectionFailed",
  EmptyComponentName = "EmptyComponentName",
  TemplateCompatibilityFailed = "TemplateCompatibilityFailed",
}

export class TerminationError extends Error {
  reason: TerminateReason;

  constructor(reason: TerminateReason) {
    super();
    this.reason = reason;
    this.name = "TerminationError";
  }
}
