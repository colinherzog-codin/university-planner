export class ModuleClass {
  constructor(id: string, title: string, credits: number, dependingOn: string[], state: ModuleClassState) {
    this._id = id;
    this._name = title;
    this._credits = credits;
    this._dependingOn = dependingOn;
    this._state = state;
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _credits: number;

  get credits(): number {
    return this._credits;
  }

  set credits(value: number) {
    this._credits = value;
  }

  private _dependingOn: string[];

  get dependingOn(): string[] {
    return this._dependingOn;
  }

  set dependingOn(value: string[]) {
    this._dependingOn = value;
  }

  private _state: ModuleClassState;

  get state(): ModuleClassState {
    return this._state;
  }

  set state(value: ModuleClassState) {
    this._state = value;
  }
}

export enum ModuleClassState {
  OPEN,
  DONE,
  IN_PROGRESS,
  MARKED,
}
