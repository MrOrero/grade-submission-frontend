import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbDatepicker,
  NgbDateStruct,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  model: NgbDateStruct | undefined;

  @Output() dateChange: EventEmitter<NgbDateStruct | undefined> =
    new EventEmitter<NgbDateStruct | undefined>();
  faCalendar = faCalendar;

  constructor(config: NgbInputDatepickerConfig) {
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2023, month: 12, day: 31 };
  }

  // onDateSelect(date: NgbDateStruct) {
  //   console.log(date);
  //   this.selectedDateChange.emit(date);
  // }
  onDateChange() {
    this.dateChange.emit(this.model);
  }
}
