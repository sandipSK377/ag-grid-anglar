import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
function actionCellRenderer(params) {
  console.log('ddd==', params);
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update"  data-action="update"> update  </button>
<button  class="action-button cancel"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit btn btn-primary" data-action="edit" > edit  </button>
<button class="action-button delete btn btn-danger" data-action="delete" > delete </button>
`;
  }

  return eGui;
}
@Component({
  selector: 'app-ag-table',
  templateUrl: './ag-table.component.html',
  styleUrls: ['./ag-table.component.scss']
})
export class AgTableComponent implements OnInit {
  // custom modal logic
  modal: boolean = false;

  // custom modal logic end

  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridOptions = {
    pagination: true,
    paginationPageSize: 3,
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked', event.data),
  }
  columnDefs = [
    {
      field: 'make', sortable: true, filter: 'agSetColumnFilter', filterParams: {
        applyMiniFilterWhileTyping: true,
      }, checkboxSelection: true
    },
    {
      field: 'model', sortable: true, filter: 'agTextColumnFilter'
    },
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
    },
    {
      headerName: "action",
      minWidth: 150,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action"
    }
  ];

  rowData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
    this.rowData = [
      { "make": "Toyota", "model": "Celica", "price": 35000, "date": "20/09/2021", "action": "edit" },
      { "make": "Ford", "model": "Mondeo", "price": 32000, "date": "19/09/2021" },
      { "make": "Porsche", "model": "Boxter", "price": 72000, "date": "21/09/2021" },
      { "make": "MG", "model": "Celica", "price": 35000, "date": "20/09/2021" },
      { "make": "Suzuki", "model": "Mondeo", "price": 32000, "date": "19/09/2021" },
      { "make": "TATA", "model": "Boxter", "price": 72000, "date": "21/09/2021" }
    ]
  }
  reset() {
    this.rowData = [
      { "make": "Toyota", "model": "Celica", "price": 35000, "date": "20/09/2021" },
      { "make": "Ford", "model": "Mondeo", "price": 32000, "date": "19/09/2021" },
      { "make": "Porsche", "model": "Boxter", "price": 72000, "date": "21/09/2021" },
      { "make": "MG", "model": "Celica", "price": 35000, "date": "20/09/2021" },
      { "make": "Suzuki", "model": "Mondeo", "price": 32000, "date": "19/09/2021" },
      { "make": "TATA", "model": "Boxter", "price": 72000, "date": "21/09/2021" }
    ]
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log('hh', selectedData)
    // const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        console.log('ddioi==', params.data.make);
        alert(params.data.make)
        // params.api.startEditingCell({
        //   rowIndex: params.node.rowIndex,
        //   colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        // });
      }

      if (action === "delete") {
        // params.api.applyTransaction({
        //   remove: [params.node.data]
        // });
        alert(params.data.make);
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }


  // custom modal 
  openModal() {
    this.modal = true;
  }
  onClickBackDrop() {
    alert('ss')
    let el = document.getElementById('modal-p');
    el.style.zIndex = '3000';
  }

}


