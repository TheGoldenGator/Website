import { Avatar, Box, Skeleton, Typography } from '@mui/material'
import {
  GridColDef,
  DataGrid,
  GridRenderCellParams,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { useState } from 'react'
import { Loading } from '../Loading'
import SocialLinks from './SocialLinks'

// Creates empty header for column
const EmptyHeaderTitle = () => {
  return <></>
}

function QuickSearchToolbar() {
  return (
    <Box>
      <GridToolbarQuickFilter
        sx={{ mr: { xs: 'auto', sm: '0' }, mb: { xs: '24px', sm: '0' } }}
      />
    </Box>
  )
}

const HandlePfpRow = (props: GridRenderCellParams, loading: boolean) => {
  let { value, row } = props
  return (
    <div style={{ display: 'block', margin: 'auto' }}>
      {!loading ? (
        <Skeleton variant="circular" width={52} height={52} />
      ) : (
        <Avatar
          alt={row.login}
          src={value}
          sx={{ width: 52, height: 52, borderRadius: '50%' }}
        />
      )}
    </div>
  )
}

const HandleSocialLinksRow = (props: GridRenderCellParams) => {
  let { value } = props
  return <SocialLinks links={value} login={null} />
}

const HandleNameRow = (props: GridRenderCellParams) => {
  let { value } = props
  return <Typography>{value}</Typography>
}

type ViewTableProps = {
  members: MemberGQLRequest | null
  loading: boolean
}

const ViewTable = ({ members, loading }: ViewTableProps) => {
  const [pageSize, setPageSize] = useState<number>(10)

  const rows: Member[] = []
  members?.members.forEach((edge, ind) => {
    rows.push({
      id: edge.id,
      twitch_id: edge.twitch_id,
      login: edge.login,
      display_name: edge.display_name,
      pfp: edge.pfp,
      links: edge.links,
      color: edge.color,
    })
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'pfp',
      width: 82,
      sortable: false,
      renderCell: (params) => {
        return HandlePfpRow(params, loading)
      },
      renderHeader: EmptyHeaderTitle,
    },
    {
      field: 'display_name',
      headerName: 'Username',
      width: 150,
      editable: true,
      renderCell: HandleNameRow,
    },
    {
      field: 'links',
      headerName: 'Links',
      flex: 1,
      sortable: false,
      colSpan: 2,
      renderCell: HandleSocialLinksRow,
    },
  ]

  return (
    <Box sx={{ height: 640, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        disableColumnMenu
        autoHeight
        density="comfortable"
        experimentalFeatures={{ newEditingApi: true }}
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        loading={members === null}
        components={{
          LoadingOverlay: Loading,
          Toolbar: QuickSearchToolbar,
        }}
      />
    </Box>
  )
}

export default ViewTable
