## Demo

https://h5aaimtron.github.io//demo-ng8-data-table/ng8DataTableDemo/#

## Installation

``` sh
npm i ng8-data-table --save
```

## Usage Examples

### AppModule.ts

``` typescript
import { NgModule } from '@angular/core';
...
import { Ng8DataTableModule } from 'ng8-data-table';

@NgModule({
    imports: [
        ...
        Ng8DataTableModule
    ],
    ...
})
export class AppModule {

}
```

### Any Component.ts import

``` typescript
import { Ng8DataTableDirective } from 'ng8-data-table/lib/directives/ng8-data-table.directive';
```

## Table with Pagination

``` html
<table class="table table-striped" ng8DataTable [data]="data" #table="ng8DataTable" [rowsOnPage]="5" sortBy="name" sortOrder="asc">
    <thead>
    <tr>
        <th>
            <ng8-column-sorter by="name">Name</n8-column-sorter>
        </th>
        <th>Email</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let item of table.data">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td class="text-right">{{ item.age }}</td>
        <td>{{ item.city | uppercase }}</td>
    </tr>
    </tbody>
</table>
<ng8-pagination [rowsOnPageSet]="[5, 10, 25]" [dataTable]="table"></ng8-pagination>
```

## Table with Load More

``` html
<table class="table table-striped" ng8DataTable [data]="data" #table="ng8DataTable" [rowsOnPage]="5" sortBy="name" sortOrder="asc">
    <thead>
        <tr>
            <th>
              <ng8-column-sorter sortBy="name">Name</ng8-column-sorter>
            </th>
            <th>
              <ng8-column-sorter sortBy="email">Email</ng8-column-sorter>
            </th>
            <th>
              <ng8-column-sorter sortBy="age">Age</ng8-column-sorter>
            </th>
            <th>
              <ng8-column-sorter sortBy="city">City</ng8-column-sorter>
            </th>
        </tr>
    </thead>
    <tbody>
    <tr *ngFor="let item of table.data">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td class="text-right">{{ item.age }}</td>
        <td>{{ item.city | uppercase }}</td>
    </tr>
    </tbody>
</table>
<div class="row">
  <div class="col-lg-12 d-flex justify-content-center">
    <button class="btn btn-primary" (click)="table.setPage(1, table.rowsOnPage + 10)">Load More</button>
  </div>
</div>
```

## API

### `data` directive

- selector: `ng8-data-table`
- exportAs: `ng8DataTable`
- inputs
  - `data: any[]` - array of data to display in table
  - `rowsOnPage: number` - number of rows should be displayed on page (default: 1000)
  - `activePage: number` - page number (default: 1)
  - `sortBy: any` - sort by parameter
  - `sortOrder: string` - sort order parameter, "asc" or "desc"
- outputs
  - `sortByChange: any` - sort by parameter
  - `sortOrderChange: any` - sort order parameter

### `ng8-column-sorter` component

- selector: `ng8-column-sorter`
- inputs
  - `sortBy: any` - specify how to sort data (argument for lodash function [_.sortBy ](https://lodash.com/docs#sortBy))

### `ng8-pagination` component

Displays buttons for changing current page and number of displayed rows (css for bootstrap is required). If array length is smaller than current displayed rows on page then it doesn't show button for changing page. If array length is smaller than min value rowsOnPage then it doesn't show any buttons.

- selector: `ng8-pagination`
- inputs
  - `rowsOnPageSet: number` - specify values for buttons to change number of diplayed rows

### `ng8-data-filter` directive

- selector: `ng8-data-filter`
- inputs
    - `filterBy: string` - specify the field name to be filtered.
    - `filterValue: string[]` - specify an array of strings containing acceptable OR filters.

``` html
    <select class="form-control selectpicker" [(ngModel)]="nameFilter"
        (ngModelChange)="dataFilter.filterValue = nameFilter; dataFilter.filter()" ng8-data-filter multiple filterBy="name"
        #dataFilter="ng8DataFilter" [filterValue]="nameFilter">
        <option value="" selected>Select Filter</option>
        <option value="John Doe">John Doe</option>
        <option value="Test Name">Test Name</option>
    </select>
```

## Change Log

- Added dropdown filter support
- Fixed filtering to support other types.
- Simplified packaging / installation
- Made directive naming more consistent