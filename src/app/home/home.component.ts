import { Component } from '@angular/core';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  modalRef: MdbModalRef<ModalComponent> | undefined;
  faPerson = faPerson;
  constructor(private modalService: MdbModalService) {}
  onAddStudent() {
    this.modalRef = this.modalService.open(ModalComponent, {
      // modalClass: 'modal-dialog-centered modal-lg',
      // modalClass: 'modal-lg',
    });
  }
}
