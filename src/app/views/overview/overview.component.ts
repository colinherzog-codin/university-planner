import {Component, OnInit} from '@angular/core';
import {ModuleClass, ModuleClassState} from "../../models/moduleClass";
import {ModuleGroup} from "../../models/moduleGroup";
import {Subscription} from "rxjs";
import {UniService} from "../../services/uni.service";
import {ModuleGroupFromDatabase} from "../../models/moduleGroupFromDatabase";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public moduleClasses: ModuleClass[] = [];
  // @ts-ignore
  public moduleGroup: ModuleGroup;
  // @ts-ignore
  isAuthenticated: boolean;
  // @ts-ignore
  slug: string;
  // @ts-ignore
  content: string;
  // @ts-ignore
  created: number;
  // @ts-ignore
  modified: number;
  // @ts-ignore
  subs: Subscription;

  constructor(private uniService: UniService) {}

  async ngOnInit() {
    this.uniService.getModuleClasses().subscribe((res: ModuleClass[]) => {
      this.moduleClasses = res;
    });
    this.uniService.getModuleGroups().subscribe((res: ModuleGroupFromDatabase[]) => {
      this.moduleGroup = this.uniService.convertToNestedModuleGroup(res);
      console.log(this.moduleGroup);
    });
  }

  public changeClassState($event: { id: string, state: number }) {
    const a = this.moduleClasses.find(f => f.id == $event.id);
    // @ts-ignore
    if (a.state == $event.state) {
      // @ts-ignore
      a.state = 0;
    } else {
      // @ts-ignore
      a.state = $event.state;
    }
  }
}
