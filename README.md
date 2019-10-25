## Installation

``` sh
npm i ng8-data-table --save
```

## Usage example

### AppModule.ts

``` typescript
import { NgModule } from '@angular/core';
...
import { DataTableModule } from 'data-table';

@NgModule({
    imports: [
        ...
        DataTableModule
    ],
    ...
})
export class AppModule {

}
```

### AppComponent.html

``` html

<table class="table table-striped" [data]="data" #table="dataTable" [rowsOnPage]="5" sortBy="name" sortOrder="asc">
    <thead>
    <tr>
        <th>
            <ng8-sorter by="name">Name</n8-sorter>
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
---

# Pagination Snippet

--- html
<ng8-pagination [rowsOnPageSet]="[5, 10, 25]" [dataTable]="table"></ng8-pagination>
---

# Load More Snippet

--- html
<div class="row">
  <div class="col-lg-12 d-flex justify-content-center">
    <button class="btn btn-primary" (click)="table.setPage(1, table.rowsOnPage + 10)">Load More</button>
  </div>
</div>
```

## API

### `data` directive

- selector: `table[data]`
- exportAs: `dataTable`
- inputs
  - `data: any[]` - array of data to display in table
  - `rowsOnPage: number` - number of rows should be displayed on page (default: 1000)
  - `activePage: number` - page number (default: 1)
  - `sortBy: any` - sort by parameter
  - `sortOrder: string` - sort order parameter, "asc" or "desc"
- outputs
  - `sortByChange: any` - sort by parameter
  - `sortOrderChange: any` - sort order parameter

### `n8-sorter` component

- selector: `ng8-sorter`
- inputs
  - `sortBy: any` - specify how to sort data (argument for lodash function [_.sortBy ](https://lodash.com/docs#sortBy))

### `ng8-pagination` component

Displays buttons for changing current page and number of displayed rows (css for bootstrap is required). If array length is smaller than current displayed rows on page then it doesn't show button for changing page. If array length is smaller than min value rowsOnPage then it doesn't show any buttons.

- selector: `ng8-pagination`
- inputs
  - `rowsOnPageSet: number` - specify values for buttons to change number of diplayed rows

### `filterBy` directive

In-Progress feature to play with. Appears to work but still structuring the code. Applies an OR filter (John Doe OR Test Name)

``` html
    <select class="form-control selectpicker" [(ngModel)]="nameFilter"
        (ngModelChange)="dataFilter.filterValue = nameFilter; dataFilter.filter()" multiple filterBy="name"
        #dataFilter="dataFilter" [filterValue]="nameFilter">
        <option value="" selected>Select Filter</option>
        <option value="John Doe">John Doe</option>
        <option value="Test Name">Test Name</option>
    </select>
---