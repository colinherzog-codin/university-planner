import {Component, OnInit} from '@angular/core';
import {ModuleClass, ModuleClassState} from "../models/moduleClass";
import {ModuleGroup} from "../models/moduleGroup";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public moduleClasses: ModuleClass[];
  public moduleGroup: ModuleGroup;

  constructor() {
    this.moduleClasses = [];
    for (let a of this.getModules()) {
      this.moduleClasses.push(this.nm(a.id, a.name, a.credits, a.dependingOn, ModuleClassState.OPEN))
    }

    const projekte = this.ng('Projekte', ['ip1', 'ip2', 'ip3', 'ip4', 'ip5', 'ba',], [], [], 42, true);
    const datascience = this.ng('Data Science', ['wods'], ['ml', 'pac', 'bverl', 'efalg', 'nlp', 'stads', 'dawr', 'ivis', 'dsp', 'sna'], [], 24, false);
    const ictsystemmanagement = this.ng('ICT System Management', ['wosm', 'itfs', 'netsi', 'cpnet', 'cysL', 'pcls'], [], [], 18, false);
    const spatialcomputing = this.ng('Spatial Computing', ['wosc'], ['simag', 'exr', 'bveri', 'efalg', 'comgr', 'uied', 'sdent', 'pfcs'], [], 21, false);
    const webengineering = this.ng('Web Engineering', ['woweb'], ['ddm', 'apsi', 'apm', 'eaf', 'webfr', 'webcl', 'fprod', 'webpr', 'stqm', 'vesys', 'stqm', 'webeC'], [], 30, false);
    const vertiefungen = this.ng('Vertiefungen', [], [], [datascience, ictsystemmanagement, spatialcomputing, webengineering], 18, true);

    const erganzungen = this.ng('Ergänzungen', [], ['stads', 'fprod', 'perl', 'eis', 'ivis', 'witec', 'webpr', 'stqm', 'emoba', 'sdent', 'ebssd', 'dnead', 'ecnf', 'tvver', 'dbarc', 'pfcs', 'eipr', 'uied', 'iot', 'dawr', 'dsp', 'blch', 'coin', 'cuie', 'adxd', 'magb', 'webeC', 'pefu', 'mpm', 'qpmC', 'dtpC', 'esol', 'sna'], [], 0, false);
    const programmierung = this.ng('Programmierung', [], ['fprog', 'cpib', 'conpr', 'prcpp', 'algd2', 'algd1', 'oop2', 'oop1'], [], 18, true);
    const softwareengineering = this.ng('Software Engineering', [], ['vesys', 'swa', 'sepC', 'depa', 'uuid', 'swc', 'edbs', 'req'], [], 18, true);
    const ictsysteme = this.ng('ICT Systeme', [], ['infsec', 'itsm', 'dnet2', 'cloud', 'syspr', 'bsys', 'dnet1', 'sysad'], [], 18, true);
    const mathematik = this.ng('Mathematik', [], ['eti', 'kry', 'vana', 'dist', 'mada', 'eana', 'lag', 'mgli'], [], 18, true);

    const informatik = this.ng('Informatik', [], [], [vertiefungen, erganzungen, programmierung, softwareengineering, ictsysteme, mathematik], 111, true);
    this.moduleGroup = this.ng('Studium', [], [], [projekte, informatik], 180, true)
  }

  ngOnInit(): void {

  }

  nm(id: string, title: string, credits: number, dependingOn: string[], state: ModuleClassState): ModuleClass {
    return new ModuleClass(id, title, credits, dependingOn, state);
  }

  ng(name: string, obligateModuleClasses: string[], moduleClasses: string[], subGroups: ModuleGroup[], minimumCredits: number, obligateGroup: boolean): ModuleGroup {
    return new ModuleGroup(name, obligateModuleClasses, moduleClasses, subGroups, minimumCredits, obligateGroup);
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

  private getModules() {
    return [
      {id: 'wosm', name: 'Workshop ICT SM', credits: 3, dependingOn: ['cysL', 'itfs']},
      {id: 'itfs', name: 'ITSM Frameworks & Standards', credits: 3, dependingOn: ['pcls']},
      {id: 'netsi', name: 'Netzwerk-Sicherheit', credits: 3, dependingOn: ['kry', 'dnet2']},
      {id: 'cpnet', name: 'Computer-Netzwerke', credits: 3, dependingOn: ['dnet2']},
      {id: 'cysL', name: 'Cyber Security Lab', credits: 3, dependingOn: ['netsi', 'bsys']},
      {id: 'pcls', name: 'Public Cloud Service', credits: 3, dependingOn: ['cloud', 'dnet2']},
      {id: 'woweb', name: 'Workshop Web', credits: 3, dependingOn: ['apsi', 'webfr', 'eaf', 'apm', 'webcl']},
      {id: 'ddm', name: 'Distributed Data Management', credits: 3, dependingOn: ['dbarc']},
      {id: 'apsi', name: 'Applikationssicherheit', credits: 3, dependingOn: ['stqm', 'syspr', 'kry']},
      {id: 'apm', name: 'Application Performance Management', credits: 3, dependingOn: ['bsys', 'vesys', 'algd2']},
      {id: 'eaf', name: 'Enterprise Applikationsframeworks', credits: 3, dependingOn: ['dbarc', 'vesys', 'depa']},
      {id: 'webfr', name: 'Web Frameworks', credits: 3, dependingOn: []},
      {id: 'webcl', name: 'Web Clients', credits: 3, dependingOn: []},
      {id: 'wods', name: 'Workshop Colin DS', credits: 3, dependingOn: []},
      {id: 'ml', name: 'Machine Learning', credits: 3, dependingOn: []},
      {id: 'pac', name: 'Parallel Computing', credits: 3, dependingOn: []},
      {id: 'bverl', name: 'Bildverarbeitung', credits: 3, dependingOn: []},
      {id: 'efalg', name: 'Effiziente Algorithmen', credits: 3, dependingOn: []},
      {id: 'nlp', name: 'Natural Language Processing', credits: 3, dependingOn: []},
      {id: 'comgr', name: 'Computer Grafik', credits: 3, dependingOn: []},
      {id: 'wosc', name: 'Workshop SC', credits: 3, dependingOn: []},
      {id: 'simag', name: 'Simulation & Agents', credits: 3, dependingOn: []},
      {id: 'exr', name: 'Extended Reality', credits: 3, dependingOn: []},
      {id: 'fprog', name: 'Functional Programming', credits: 3, dependingOn: []},
      {id: 'cpib', name: 'Compilerbau', credits: 3, dependingOn: []},
      {id: 'conpr', name: 'Concurrent Programming', credits: 3, dependingOn: []},
      {id: 'prcpp', name: 'Programmieren in C++', credits: 3, dependingOn: []},
      {id: 'algd2', name: 'Algorithmen und Datenstrukturen 2', credits: 3, dependingOn: []},
      {id: 'algd1', name: 'Algorithmen und Datenstrukturen 1', credits: 3, dependingOn: []},
      {id: 'oop2', name: 'Objektorientierte Programmierung 2', credits: 3, dependingOn: []},
      {id: 'oop1', name: 'Objektorientierte Programmierung 1', credits: 3, dependingOn: []},
      {id: 'vesys', name: 'Verteilte Systeme', credits: 3, dependingOn: []},
      {id: 'swa', name: 'Software Architecture', credits: 3, dependingOn: []},
      {id: 'sepC', name: 'Software Entwicklungsprozesse', credits: 3, dependingOn: []},
      {id: 'depa', name: 'Design Patterns', credits: 3, dependingOn: []},
      {id: 'uuid', name: 'Usability & User Interface Design', credits: 3, dependingOn: []},
      {id: 'swc', name: 'Software Construction', credits: 3, dependingOn: []},
      {id: 'edbs', name: 'Einführung in Datenbanksysteme', credits: 3, dependingOn: []},
      {id: 'req', name: 'Requirement Engineering', credits: 3, dependingOn: []},
      {id: 'infsec', name: 'Informationssicherheit', credits: 3, dependingOn: []},
      {id: 'itsm', name: 'IT System Management', credits: 3, dependingOn: []},
      {id: 'dnet2', name: 'Datennetze 2', credits: 3, dependingOn: []},
      {id: 'cloud', name: 'Cloud Computing', credits: 3, dependingOn: []},
      {id: 'syspr', name: 'System-Programmierung', credits: 3, dependingOn: []},
      {id: 'bsys', name: 'Betriebssysteme', credits: 3, dependingOn: []},
      {id: 'dnet1', name: 'Datennetze 1', credits: 3, dependingOn: []},
      {id: 'sysad', name: 'System-Administration', credits: 3, dependingOn: []},
      {id: 'eti', name: 'Einführung in die theoretische Informatik', credits: 3, dependingOn: []},
      {id: 'kry', name: 'Kryptologie', credits: 3, dependingOn: []},
      {id: 'vana', name: 'Vertiefung Analysis', credits: 3, dependingOn: []},
      {id: 'dist', name: 'Diskrete Stochastik', credits: 3, dependingOn: []},
      {id: 'mada', name: 'Mathematik für die Datenkommunikation', credits: 3, dependingOn: []},
      {id: 'eana', name: 'Einführung in die Analysis', credits: 3, dependingOn: []},
      {id: 'lag', name: 'Lineare Algebra und Geometrie', credits: 3, dependingOn: []},
      {id: 'mgli', name: 'Mathematische Grundlagen der Informatik', credits: 3, dependingOn: []},
      {id: 'ip1', name: 'Informatik Projekt 1', credits: 6, dependingOn: []},
      {id: 'ip2', name: 'Informatik Projekt 2', credits: 6, dependingOn: []},
      {id: 'ip3', name: 'Informatik Projekt 3', credits: 6, dependingOn: []},
      {id: 'ip4', name: 'Informatik Projekt 4', credits: 6, dependingOn: []},
      {id: 'ip5', name: 'Informatik Projekt 5', credits: 6, dependingOn: []},
      {id: 'ba', name: 'Bachelorarbeit', credits: 12, dependingOn: []},
      ]
  }
}
