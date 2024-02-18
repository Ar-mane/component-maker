/* eslint-disable @typescript-eslint/naming-convention */
export enum TerminateReason {
  ComponentAlreadyExists = 'ComponentAlreadyExists',
  NoUriProvided = 'NoUriProvided',
  ConfigCreatedSuccessfully = 'ConfigCreatedSuccessfully',
  ConfigCreationAborted = 'ConfigCreationAborted',
  TemplateCompatibilityFailed = 'TemplateCompatibilityFailed',
  Canceled = 'Canceled',
  NoWorkSpace = 'NoWorkSpace',
}

export class TerminationError extends Error {
  reason: TerminateReason;

  constructor(reason: TerminateReason) {
    super();
    this.reason = reason;
    this.name = 'TerminationError';
  }
}
