import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleGroup} from "../../models/moduleGroup";
import {ModuleClass, ModuleClassState} from "../../models/moduleClass";
import {UserModuleState} from "../../models/userModuleState";

@Component({
  selector: 'app-module-group',
  templateUrl: './module-group.component.html',
  styleUrls: ['./module-group.component.scss']
})
export class ModuleGroupComponent implements OnInit {

  // @ts-ignore
  @Input() moduleGroup: ModuleGroup;
  // @ts-ignore
  @Input() moduleClasses: ModuleClass[];
  @Input() userModuleStates: UserModuleState[] | undefined;
  @Output() changeClassStateEvent: EventEmitter<{ id: string, state: number }> = new EventEmitter<{ id: string, state: number }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getModuleClasses(): ModuleClass[] {
    return this.moduleClasses.filter(m => this.moduleGroup.moduleClasses.includes(m.id)
      || this.moduleGroup.obligateModuleClasses.includes(m.id));
  }

  getDoneCredits() {
    const classes = this.getAllGroupModuleClasses(this.moduleGroup).filter((v, i, a) => a.indexOf(v) === i);

    return this.moduleClasses.filter(m => m.state == ModuleClassState.DONE && classes.includes(m.id))
      .reduce((sum, current) => sum + current.credits, 0);
  }

  recommended(moduleClass: ModuleClass): boolean {
    if (moduleClass.dependingOn == []) return true;
    return (moduleClass.state != ModuleClassState.DONE && moduleClass.state != ModuleClassState.IN_PROGRESS && this.allRelyingClassesDone(moduleClass))
  }

  private allRelyingClassesDone(moduleClass: ModuleClass) {
    for (let otherClass of moduleClass.dependingOn) {
      // @ts-ignore
      const classState = this.moduleClasses.find(m => m.id == otherClass);
      if (classState == null) continue;
      const state = classState.state;
      if (state != ModuleClassState.DONE && state != ModuleClassState.IN_PROGRESS) {
        return false;
      }
    }
    return true;
  }

  private getAllGroupModuleClasses(moduleGroup: ModuleGroup): string[] {
    let classes: string[] = [];
    classes.push(...moduleGroup.moduleClasses);
    classes.push(...moduleGroup.obligateModuleClasses);
    for (let moduleSubGroup of moduleGroup.subGroups) {
      classes.push(...this.getAllGroupModuleClasses(moduleSubGroup))
    }
    return classes;
  }

  getModuleClassState(id: string): ModuleClassState | undefined {
    let mcs = this.userModuleStates?.find(u => u.moduleClassId == id)?.moduleClassState;
    return mcs;
  }
}
