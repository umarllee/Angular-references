import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ShipmentService } from 'src/app/services/shipment.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: ShipmentService) { }

  userForm = this.fb.group({
    username: '',
    password: ''
  })

  ngOnInit(): void {
  }

  get UF(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  save() {

    let model = {
      username: this.UF['username'].value,
      password: this.UF['password'].value,

    }

    // this.service.getData(model)
  }

}
