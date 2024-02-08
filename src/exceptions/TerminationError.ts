/* eslint-disable @typescript-eslint/naming-convention */
export enum TerminateReason {
  ComponentAlreadyExists,
  NoUriProvided,
  ConfigCreatedSuccessfully,
  ConfigCreationAborted,
  TemplateSelectionFailed,
  EmptyComponentName,
}
export class TerminationError extends Error {
  private _reason: TerminateReason;
  public get reason(): TerminateReason {
    return this._reason;
  }
  public set reason(value: TerminateReason) {
    this._reason = value;
  }
  constructor(reason: TerminateReason) {
    super();
    this._reason = reason;
    this.name = "ExtensionTerminationError";
  }
}
