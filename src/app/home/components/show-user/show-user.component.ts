import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  constructor(private service: ShipmentService) { }

  ngOnInit(): void {
    this.service.data$.subscribe({
      next: (res) => console.log(res)
    })
  }

}
