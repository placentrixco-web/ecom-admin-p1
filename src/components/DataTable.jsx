
import * as React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material'
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'

export default function DataTable({ columns, data, page = 0, rowsPerPage = 10, onPaginationChange }) {
  const [p, setP] = React.useState(page)
  const [rpp, setRpp] = React.useState(rowsPerPage)

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  const handleChangePage = (_, newPage) => { setP(newPage); onPaginationChange?.(newPage, rpp) }
  const handleChangeRowsPerPage = e => { const newRows = parseInt(e.target.value, 10); setRpp(newRows); setP(0); onPaginationChange?.(0, newRows) }

  const sliceStart = p * rpp
  const sliceEnd = sliceStart + rpp

  return (
    <Paper>
      <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(h => (
                  <TableCell key={h.id}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.slice(sliceStart, sliceEnd).map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.slice(sliceStart, sliceEnd).length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination component="div" count={data.length} page={p} onPageChange={handleChangePage} rowsPerPage={rpp} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  )}
