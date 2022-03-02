export class ModuleGroup {
  constructor(name: string, obligateModuleClasses: string[], moduleClasses: string[], subGroups: ModuleGroup[], minimumCredits: number, obligateGroup: boolean) {
    this._name = name;
    this._moduleClasses = moduleClasses;
    this._subGroups = subGroups;
    this._minimumCredits = minimumCredits;
    this._obligateModuleClasses = obligateModuleClasses;
    this._obligateGroup = obligateGroup;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _moduleClasses: string[];

  get moduleClasses(): string[] {
    return this._moduleClasses;
  }

  set moduleClasses(value: string[]) {
    this._moduleClasses = value;
  }

  private _obligateModuleClasses: string[];

  get obligateModuleClasses(): string[] {
    return this._obligateModuleClasses;
  }

  set obligateModuleClasses(value: string[]) {
    this._obligateModuleClasses = value;
  }

  private _subGroups: ModuleGroup[];

  get subGroups(): ModuleGroup[] {
    return this._subGroups;
  }

  set subGroups(value: ModuleGroup[]) {
    this._subGroups = value;
  }

  private _minimumCredits: number;

  get minimumCredits(): number {
    return this._minimumCredits;
  }

  set minimumCredits(value: number) {
    this._minimumCredits = value;
  }

  private _obligateGroup: boolean;

  get obligateGroup(): boolean {
    return this._obligateGroup;
  }

  set obligateGroup(value: boolean) {
    this._obligateGroup = value;
  }
}
