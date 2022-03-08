import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleClass, ModuleClassState} from "../../models/moduleClass";
import {UserModuleState} from "../../models/userModuleState";

@Component({
  selector: 'app-module-class',
  templateUrl: './module-class.component.html',
  styleUrls: ['./module-class.component.scss']
})
export class ModuleClassComponent implements OnInit {


  // @ts-ignore
  @Input() moduleClass: ModuleClass;
  @Input() moduleClassState: ModuleClassState | undefined;
  // @ts-ignore
  @Input() recommended: boolean;
  @Output() changeClassStateEvent: EventEmitter<{ id: string, state: number }> = new EventEmitter<{ id: string, state: number }>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.moduleClassState != undefined) {
      this.moduleClass.state = this.moduleClassState;
    }
  }

  changeState(state: number) {
    this.changeClassStateEvent.emit({id: this.moduleClass.id, state: state});
  }
}
