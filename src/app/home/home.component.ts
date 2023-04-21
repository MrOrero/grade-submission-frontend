import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  currentRoute: string = '';

  constructor(
    private modalService: MdbModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentRoute = params['route'];
    });
  }

  onAddStudent() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'add-student',
      },
      // modalClass: 'modal-dialog-centered modal-lg',
      // modalClass: 'modal-lg',
    });
  }
}
