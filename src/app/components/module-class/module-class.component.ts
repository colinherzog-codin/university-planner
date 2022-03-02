import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleClass} from "../../models/moduleClass";

@Component({
  selector: 'app-module-class',
  templateUrl: './module-class.component.html',
  styleUrls: ['./module-class.component.scss']
})
export class ModuleClassComponent implements OnInit {


  // @ts-ignore
  @Input() moduleClass: ModuleClass;
  // @ts-ignore
  @Input() recommended: boolean;
  @Output() changeClassStateEvent: EventEmitter<{ id: string, state: number }> = new EventEmitter<{ id: string, state: number }>();

  constructor() { }

  ngOnInit(): void {
  }

  changeState(state: number) {
    this.changeClassStateEvent.emit({id: this.moduleClass.id, state: state});
  }
}
