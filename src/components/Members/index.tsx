import {
  Box,
  Grid,
  TablePagination,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { MemberCard, MemberProps } from './MemberCard'
import React from 'react'

function Members() {
  const [members, setMembers] = useState<MemberProps[]>()
  const [page, setPage] = useState<number>(0)
  const [entries, setEntries] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(12)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [sortMethod, setSortMethod] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'GoldenGator | Members'
    fetch(`http://localhost:8000/members?page=${page}&limit=${rowsPerPage}`)
      .then((response) => response.json())
      .then((json) => {
        setMembers(json.data)
        setPage(json.pagination.current)
        setEntries(json.pagination.results)
        setLoaded(true)
      })
  }, [page, rowsPerPage])

  const [alignment, setAlignment] = React.useState<string | null>('left')

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    console.log(newAlignment)
    setAlignment(newAlignment)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  return (
    <div className="member-cards">
      <Box sx={{ flexGrow: 1 }}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        ></ToggleButtonGroup>
        <Grid container spacing={3}>
          <Grid item xs container direction="row" spacing={2} >
            {members?.map((item, index) => (
              <Grid item xs={8} sm={6} md={3} lg={2}>
                {MemberCard(item, loaded, index)}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          value="check"
          selected={sortMethod}
          onChange={() => {
            setSortMethod(!sortMethod)
          }}
        >
          {/* Make this a svg and put it instead of the typography and add search bar */}
          <svg
            className="member-social-media-icon"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.096 18.857H7.525V.429A.414.414 0 0 0 7.096 0H4.525a.414.414 0 0 0-.429.429v18.429H1.525c-.196 0-.331.089-.402.268-.072.17-.04.326.094.469l4.286 4.286c.098.079.2.119.308.119.116 0 .219-.04.308-.12l4.272-4.272a.506.506 0 0 0 .134-.321.414.414 0 0 0-.429-.43zm10.006 3.617H16.78c-.188 0-.322.009-.402.026l-.188.026V22.5l.148-.147c.133-.16.227-.276.281-.348l4.941-7.099v-1.191h-7.594v3.066h1.607v-1.54h3.107c.16 0 .295-.014.4-.04a.856.856 0 0 0 .102-.007c.039-.004.068-.007.086-.007v.04l-.146.121c-.08.08-.176.2-.281.361L13.9 22.795V24h7.82v-3.12h-1.619v1.594h.001zm1.875-13.608L18.895 0h-2.168l-3.082 8.866h-.936v1.419h3.842V8.866h-1.004l.631-1.929h3.254l.629 1.929h-1.004v1.419h3.857V8.866h-.937zm-5.358-3.402.977-2.92c.037-.107.07-.236.102-.388s.047-.232.047-.241l.039-.268h.055c0 .036.008.125.025.268l.162.629.963 2.92h-2.37z"></path>
          </svg>
        </ToggleButton>
      </ToggleButtonGroup>

      <TablePagination
        component="div"
        count={entries}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[12, 24, 32, { value: -1, label: 'All' }]}
      />
    </div>
  )
}
export default Members
