import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounce, debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',

  templateUrl: './searchBox.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  emitValue(term: string): void {
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe;
  }
}
