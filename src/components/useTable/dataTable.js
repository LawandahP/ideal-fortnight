import React, {useState, useLayoutEffect, useRef} from 'react';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const DataTable = ({rows, columns, loading, density}) => {

    const [ pageSize, setPageSize ] = useState(10)

    

    return (
        <div style={{ display: 'flex', height: "80vh"}}>
            <div style={{ flexGrow: 1, height: '100%'}}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  // autoHeight
                  getRowId = {(row) => row._id ? row._id : row.slug ? row.slug : row.id ? row.id : row.invoice_id}
                  density={"compact" || density}
                  loading={loading}
                  pagination
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 50, 100]}
                  disableSelectionOnClick={true}
                  // components={{ Toolbar: CustomToolbar }}
                  componentsProps={{
                      toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                  },
                  }}
              />
             </div>
        </div>
    )
}

export default DataTable