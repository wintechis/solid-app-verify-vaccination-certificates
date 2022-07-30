export class LoadAccess {
  static readonly type = "[Authorization] LoadAccess";
}

export class GrantAccess {
  static readonly type = "[Authorization] GrantAccess";
  constructor(public webIdToShare: string) {}
}
