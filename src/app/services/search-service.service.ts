import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  private searchSubject = new Subject<string>();
  setFilter(query: string) {
    this.searchSubject.next(query);
  }
  getFilter() {
    return this.searchSubject.asObservable();
  }
}




