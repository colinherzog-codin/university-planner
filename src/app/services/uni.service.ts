import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  setDoc,
  getDoc,
  doc,
  Firestore,
  collectionChanges, where, collectionSnapshots, query
} from "@angular/fire/firestore";
import {ModuleClass} from "../models/moduleClass";
import {Observable} from "rxjs";
import {ModuleGroup} from "../models/moduleGroup";
import {ModuleGroupFromDatabase} from "../models/moduleGroupFromDatabase";
import {AuthService} from "./auth.service";
import {UserModuleState} from "../models/userModuleState";
import {take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UniService {

  constructor(private readonly firestore: Firestore, private readonly auth: AuthService) {
  }

  updateModuleClassState(moduleClass: ModuleClass) {
    if (this.auth.getUserName() != undefined) {
      let username = this.auth.getUserName();
      const userModuleStateRef = collection(this.firestore, 'userModuleState');
      let coll = collectionSnapshots(
        query(
          userModuleStateRef,
          where('userId', '==', this.auth.getUserName()),
          where('moduleClassId', '==', moduleClass.id)
        )
      );
      coll.pipe(take(1)).subscribe(entry => {
        if (entry.length == 0) {
          addDoc(userModuleStateRef, {
            moduleClassState: moduleClass.state,
            userId: this.auth.getUserName(),
            moduleClassId: moduleClass.id
          }).then(x => console.log(x));
        } else {
          let docRef = doc(this.firestore, 'userModuleState', entry[0].id);
          setDoc(docRef, {
            moduleClassState: moduleClass.state,
            userId: this.auth.getUserName(),
            moduleClassId: moduleClass.id
          }, {merge: true}).then(r => console.log(r));
        }
      });
    }
  }

  addModuleClass(moduleClass: ModuleClass) {
    let adder = {
      id: moduleClass.id,
      name: moduleClass.name,
      credits: moduleClass.credits,
      dependingOn: moduleClass.dependingOn,
      assessment: moduleClass.assessment,
      duringAssessment: moduleClass.duringAssessment,
    }
    const moduleClassRef = collection(this.firestore, 'moduleClass/');
    return addDoc(moduleClassRef, adder);
  }

  addModuleGroup(moduleGroup: ModuleGroupFromDatabase) {
    let adder = {
      name: moduleGroup.name,
      obligateModuleClasses: moduleGroup.obligateModuleClasses,
      moduleClasses: moduleGroup.moduleClasses,
      subGroups: moduleGroup.subGroups,
      minimumCredits: moduleGroup.minimumCredits,
      obligateGroup: moduleGroup.obligateGroup,
    }
    const moduleClassRef = collection(this.firestore, 'moduleGroup');
    return addDoc(moduleClassRef, adder);
  }

  getModuleClasses(): Observable<ModuleClass[]> {
    const moduleClassRef = collection(this.firestore, 'moduleClass');
    return collectionData(moduleClassRef) as Observable<ModuleClass[]>;
  }

  getUserModuleStates(): Observable<UserModuleState[]> {
    const userModuleStatesRef = collection(this.firestore, 'userModuleState');
    return collectionData(userModuleStatesRef) as Observable<UserModuleState[]>;
  }

  getModuleGroups(): Observable<ModuleGroupFromDatabase[]> {
    const moduleGroupRef = collection(this.firestore, 'moduleGroup');
    return collectionData(moduleGroupRef, {idField: 'id'}) as Observable<ModuleGroupFromDatabase[]>;
  }

  convertToNestedModuleGroup(moduleGroups: ModuleGroupFromDatabase[]): ModuleGroup {
    let highestGroupFromDatabase = moduleGroups.find(m => m.name == "Studium");
    // @ts-ignore
    return this.createGroup(highestGroupFromDatabase, moduleGroups);
  }

  private createGroup(groupFromDatabase: ModuleGroupFromDatabase, moduleGroups: ModuleGroupFromDatabase[]): ModuleGroup {
    return new ModuleGroup(
      groupFromDatabase.name,
      groupFromDatabase.obligateModuleClasses,
      groupFromDatabase.moduleClasses,
      this.generateSubGroups(moduleGroups.filter(f => groupFromDatabase.subGroups.includes(f.name)), moduleGroups),
      groupFromDatabase.minimumCredits,
      groupFromDatabase.obligateGroup
    );
  }

  private generateSubGroups(subGroupsFromDatabase: ModuleGroupFromDatabase[], moduleGroups: ModuleGroupFromDatabase[]): ModuleGroup[] {
    let subGroups: ModuleGroup[] = [];
    for (let subGroupFromDatabase of subGroupsFromDatabase) {
      subGroups.push(this.createGroup(subGroupFromDatabase, moduleGroups));
    }
    return subGroups;
  }
}

