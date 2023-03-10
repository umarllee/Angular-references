import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-drag-table',
  templateUrl: './drag-table.component.html',
  styleUrls: ['./drag-table.component.scss']
})
export class DragTableComponent implements OnInit {
  title = "Add ";
  isAddPopUp = true;
  isUpdatePopUp = false;

  statusForm = this.fb.group({
    id: 0,
    moduleId: ['', Validators.required],
    colorCode: ['#1A9CC9', Validators.required],
    orderBy: 0,
    translations: this.fb.array([]),
  })

  languages: any[] = [];
  modules: any[] = [];
  done: any[] = [];
  isList = false;
  isChecked = false;

  highlightedRows: any[] = [];
  highlightedRowss: any = {};
  selectedIndex = 0;

  isCause = false;
  // id!: Guid;
  langCount!: number;
  initialValues: any;
  constructor(private fb: FormBuilder) { }
  selectedUpdateIndex = -1;
  statusArr: any[] = [];
  arrSub: any[] = [];
  arrDesc: any[] = [];
  deletedStIds: any[] = []

  disableModule = false;

  ngOnInit(): void {
    // this.statusService.getModules().subscribe({
    //   next: (res) => {
    //     res.data.map((dt: any) => this.modules.push(dt))
    //   },
    //   error: (err) => console.log(err)
    // })

    // this.langService.getSystemLangs().subscribe({
    //   next: (res) => {
    //     this.langCount = res.data.length
    //     this.languages = res.data
    //   },
    //   error: (err) => console.log(err)
    // })

    // if (this.data.isUpdate) {
    //   this.title = 'Update';
    //   this.isAddPopUp = false;
    //   this.isUpdatePopUp = true;

    //   this.getStatusDatas(this.data.rowData.moduleId);

    //   // this.statusService.getUpdateStatusData(this.data.rowData.moduleId).subscribe({
    //   //   next: (res) => {
    //   //     res.data.map((dt: any) => {
    //   //       for (let i = 0; i < dt.translations.length; i++) {
    //   //         if (dt.translations[i].langId == 1) {
    //   //           this.done.push({ message: `${dt.translations[i].subject} - ${dt.translations[i].description}`, color: dt.colorCode, data: dt });
    //   //         }
    //   //       }
    //   //     })

    //   //     this.statusForm.patchValue({
    //   //       moduleId: res.data[0].moduleId,
    //   //     })
    //   //     this.isList = true;
    //   //   },
    //   //   error: (err) => console.log(err),
    //   //   complete: () => {
    //   //     this.addnewSubjects();
    //   //   }
    //   // })
    // }

    // if (!this.data.isUpdate) {
    //   this.addnewSubjects();
    // }

    this.modules = [
      {key: 1, value: 'Order'},
      {key: 2, value: 'Options'},
    ]

    this.languages = [
      {id: 1, name: 'Azerbaijan', shortName: 'AZ'},
      {id: 2, name: 'English', shortName: 'EN'},
      {id: 3, name: 'Russian', shortName: 'RU'},
    ]
    this.addnewSubjects();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(this.SF['translations'].value, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  get SF(): { [key: string]: AbstractControl } {
    return this.statusForm.controls;
  }

  get translations(): FormArray {
    return this.statusForm.get("translations") as FormArray
  }

  newSubjects(): FormGroup {
    return this.fb.group({
      langId: [''],
      subject: [''],
      description: [''],
    });
  }

  addnewSubjects() {
    if (!this.translations.length) this.translations.push(this.newSubjects());

    else {
      if (
        (this.translations.length != this.langCount)
        &&
        (this.translations.value[this.translations.length - 1].langId && this.translations.value[this.translations.length - 1].subject && this.translations.value[this.translations.length - 1].description)) this.translations.push(this.newSubjects());
      else alert('Add language and values first')
    }

  }

  newLangsPatch(data: any): FormGroup {
    return this.fb.group(data);
  }

  selectSubjectLang(langId: number, index: number) {
    let count = 0;
    this.translations.value.map((dt: any) => {
      if (dt.langId == langId) {
        count++;
      }
    })

    if (count > 1) {
      this.statusForm.value.translations?.splice(this.statusForm.value.translations.length - 1, 1)
      this.removeLang(this.statusForm.value.translations!.length)
      alert("You can not enter the same language")
    }
  }

  removeLang(id: number) {
    if (this.translations.length != 1) {
      this.translations.removeAt(id);
    }
  }

  removeSubjectListItem(id: number, index: number) {
    if (index == 0) this.disableModule = false;
    if (id) this.deletedStIds.push(id)
    this.done.splice(index, 1)
    this.SF['translations'].value.splice(index, 1)
    if (this.done.length == 0) this.isList = false;
  }

  addSubjectListItem() {
    if (this.selectedUpdateIndex != -1) {
      this.statusForm.value.translations?.map((dt: any) => { // yeni sonuncu deyer bosdursa, onu arrayden sil
        if (!dt.langId || !dt.subject || !dt.description) this.statusForm.value.translations?.splice(this.statusForm.value.translations.length - 1, 1)
      })

      this.done[this.selectedUpdateIndex].data = this.statusForm.value
      this.done[this.selectedUpdateIndex].color = this.done[this.selectedUpdateIndex].data.colorCode

      for (let i = 0; i < this.done[this.selectedUpdateIndex].data.translations.length; i++) {
        
        if (this.done[this.selectedUpdateIndex].data.translations[i].langId == 1) {
          
          this.done[this.selectedUpdateIndex].message = `${this.done[this.selectedUpdateIndex].data.translations[i].subject} - ${this.done[this.selectedUpdateIndex].data.translations[i].description}`
        }
      }

      alert("Status updated!");
      (this.statusForm.controls['translations']).clear();
      this.addnewSubjects()

    }

    if (this.selectedUpdateIndex == -1) {

      this.statusForm.value.translations?.map((dt: any) => { // yeni sonuncu deyer bosdursa, onu arrayden sil
        if (!dt.langId || !dt.subject || !dt.description) this.statusForm.value.translations?.splice(this.statusForm.value.translations.length - 1, 1)
      })

      if (!this.translations.value.length) {
       alert("Please, fill all fields!") 
      }

      else {
        this.done.push({ message: `${this.SF['translations'].value[0].subject} - ${this.SF['translations'].value[0].description}`, color: this.SF['colorCode'].value, data: this.statusForm.value });
        this.isList = true;
        (this.statusForm.controls['translations']).clear();
        this.addnewSubjects()
      }
      this.statusForm.get('colorCode')?.reset('#1A9CC9');
    }

    this.disableModule = true;

    this.isChecked = false;
    this.isCause = false;

  }

  numberOnly(event: any): boolean {  // qnq ve etsnq code-a ancaq reqem yazsin
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getStatusDatas(key: number) {
  }

  changeModule(key: number) {
    if(!this.disableModule) this.getStatusDatas(key);
  }

  updateStatusData(data: any, index: number) {
    this.selectedUpdateIndex = index;
    this.SF['colorCode'].setValue(data.colorCode);
    this.statusForm.patchValue({
      id: data.id
    })

    for (let index = 0; index < this.translations.value.length; index++) {
      this.translations.removeAt(this.translations.value[index])
    }

    data.translations.map((dt: any) => {
      this.translations.push(this.newLangsPatch(dt))
    })
    this.addnewSubjects();
  }


  save() {
    if (this.isList) {

      this.statusForm.value.translations?.map((dt: any) => {
        if (!dt.langId || !dt.subject || !dt.description) this.statusForm.value.translations?.splice(this.statusForm.value.translations.length - 1, 1)
      })

      this.done.map((element: any, index: number) => {
        element.data.orderBy = index + 1;
      })

      this.done.map((dt: any) => this.statusArr.push(dt.data))

      console.log(this.deletedStIds)

      let saveModel = {
        deleteStatusIds: this.deletedStIds,
        statuses: this.statusArr
      }

      console.log(saveModel)
    }

    else {
      alert('You must add data')
    }
  }

}
