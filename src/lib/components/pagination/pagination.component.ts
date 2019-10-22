import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { DataTable } from '../../data-table';

@Component({
  selector: 'ng8-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() rowsOnPageSet = [];
  @Input() 
  set dataTable(val: DataTable) {
    this._table = val;
    console.log("Set DataTable");
    console.log(val);
  }
  
  get dataTable() {
    return this._table;
  }
  
  private _table: DataTable;

  public minRowsOnPage = 0;

  constructor() { }

  ngOnChanges(changes: any) {
    if(changes.rowsOnPageSet) {
      this.minRowsOnPage = _.min(this.rowsOnPageSet);
    }
  }

}
