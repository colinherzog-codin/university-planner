import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {ModuleClass} from "../models/moduleClass";
import {Observable} from "rxjs";
import {ModuleGroup} from "../models/moduleGroup";
import {ModuleGroupFromDatabase} from "../models/moduleGroupFromDatabase";
import firebase from "firebase/compat";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class UniService {

  constructor(private firestore: Firestore) {
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

