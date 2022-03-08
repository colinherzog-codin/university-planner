export class UserModuleState {
  constructor(moduleClassId: string, moduleClassState: number, userId: string) {
    this._moduleClassId = moduleClassId;
    this._moduleClassState = moduleClassState;
    this._userId = userId;
  }

  private _moduleClassId: string;

  get moduleClassId(): string {
    return this._moduleClassId;
  }

  set moduleClassId(value: string) {
    this._moduleClassId = value;
  }

  private _moduleClassState: number;

  get moduleClassState(): number {
    return this._moduleClassState;
  }

  set moduleClassState(value: number) {
    this._moduleClassState = value;
  }

  private _userId: string;

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }
}
