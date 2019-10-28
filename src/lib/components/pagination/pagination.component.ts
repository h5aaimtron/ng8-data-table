import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { Ng8DataTableDirective } from '../../directives/ng8-data-table.directive';

@Component({
  selector: 'ng8-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() rowsOnPageSet = [];
  @Input() 
  set dataTable(val: Ng8DataTableDirective) {
    this._table = val;
  }
  
  get dataTable() {
    return this._table;
  }
  
  private _table: Ng8DataTableDirective;

  public minRowsOnPage = 0;

  constructor() { }

  ngOnChanges(changes: any) {
    if(changes.rowsOnPageSet) {
      this.minRowsOnPage = _.min(this.rowsOnPageSet);
    }
  }

}
