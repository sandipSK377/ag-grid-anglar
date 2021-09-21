import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ag-table',
  templateUrl: './ag-table.component.html',
  styleUrls: ['./ag-table.component.scss']
})
export class AgTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs = [
    {
      field: 'make', sortable: true, filter: 'agSetColumnFilter', filterParams: {
        applyMiniFilterWhileTyping: true,
      }, checkboxSelection: true
    },
    { field: 'model', sortable: true, filter: 'agTextColumnFilter' },
    {
      field: 'price', sortable: true, filter: 'agTextColumnFilter', filterParams: {
        buttons: ['reset', 'apply'],
        debounceMs: 200
      }
    },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      // add extra parameters for the date filter
      filterParams: {
        buttons: ['reset', 'apply'],
        // provide comparator function
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.split('/');
          const day = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[0]);
          const cellDate = new Date(day, month, year);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        }
      }
    }
  ];

  rowData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
    this.rowData = [
      { "make": "Toyota", "model": "Celica", "price": 35000, "date": "20/09/2021" },
      { "make": "Ford", "model": "Mondeo", "price": 32000, "date": "19/09/2021" },
      { "make": "Porsche", "model": "Boxter", "price": 72000, "date": "21/09/2021" }
    ]
  }
  reset() {
    this.rowData = [
      { "make": "Toyota", "model": "Celica", "price": 35000, "date": "20/09/2021" },
      { "make": "Ford", "model": "Mondeo", "price": 32000, "date": "19/09/2021" },
      { "make": "Porsche", "model": "Boxter", "price": 72000, "date": "21/09/2021" }
    ]
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log('hh', selectedData)
    // const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}

var filterParams = {
  comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  minValidYear: 2000,
};
