import { Component, Input, OnChanges, SimpleChange, Optional } from '@angular/core';
import { DataTable } from '../../data-table';
import { PageEvent } from '../../interfaces/page-event';

@Component({
  selector: 'ng8-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnChanges {
  @Input() dataTable: DataTable;
  private _table: DataTable

  public activePage: number;
  public rowsOnPage: number;
  public dataLength: number = 0;
  public lastPage: number;

  constructor(@Optional() private injectedTable: DataTable) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    this._table = this.dataTable || this.injectedTable;
    this.onPageChangeSubscriber(this._table.getPage());
    this._table.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  public setPage(pageNumber: number): void {
    this._table.setPage(pageNumber, this.rowsOnPage);
  }

  public setRowsOnPage(rowsOnPage: number): void {
    this._table.setPage(this.activePage, rowsOnPage);
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this.activePage = event.activePage;
    this.rowsOnPage = event.rowsOnPage;
    this.dataLength = event.dataLength;
    this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
  };

}
