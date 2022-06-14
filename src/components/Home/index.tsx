import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import '../../styles/index.css'
import { StreamerProps, StreamerCard } from './StreamerCard'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import SadgeEmote from '../../images/Sadge.png'

function Home() {
  const dev = false
  setInterval(() => {
    window.location.reload()
  }, 300000) // 5 mins

  const [streams, setStreams] = useState<StreamerProps[]>()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [sortStatus, setSortStatus] = useState(
    localStorage.getItem('status') !== null
      ? localStorage.getItem('status')
      : 'online',
  )
  const [sortList, setSortList] = useState(
    localStorage.getItem('sort') !== null
      ? localStorage.getItem('sort')
      : 'viewers',
  )

  // Pagination
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(1)
  const [actualPage, setActualPage] = useState<number>(1)

  useEffect(() => {
    fetch(
      dev // http://localhost:8000/streams?page=${actualPage}&limit=12&status=${sortStatus}&sort=${sortList}
        ? `http://localhost:8000/streams?page=${actualPage}&limit=12&status=${sortStatus}&sort=${sortList}`
        : 'https://api.thegoldengator.tv/streams?status=online',
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data)
        setStreams(json.data !== null ? json.data : [])
        setTotalPages(json.pagination.total)
        setCurrentPage(json.pagination.current)
        setTotalResults(json.pagination.results)
      })
    setLoaded(true)
  }, [actualPage, dev, sortList, sortStatus])

  const handleStatusSort = (
    event: React.MouseEvent<HTMLElement>,
    newSortStatus: string,
  ) => {
    if (newSortStatus !== null) {
      setActualPage(1)
      setSortStatus(newSortStatus)
      localStorage.setItem('status', newSortStatus)
    }
  }

  const handleSortList = (
    event: React.MouseEvent<HTMLElement>,
    newSortList: string | null,
  ) => {
    if (newSortList !== null) {
      setSortList(newSortList)
      localStorage.setItem('sort', newSortList)
    }
  }

  /* Pagination button generation */
  const buttons = []
  for (let index = 0; index < totalPages; index++) {
    const num = index + 1
    buttons.push(
      <Button
        key={num}
        variant={actualPage === num ? 'contained' : 'outlined'}
        onClick={() => {
          setActualPage(num)
        }}
      >
        {num}
      </Button>,
    )
  }

  return (
    <div className="background">
      <div className="stream-cards">
        <Stack
          direction="row"
          spacing={4}
          sx={{ marginBottom: 3, marginTop: 9 }}
        >
          {/*<Stack>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ color: 'rgb(119, 119, 119)' }}
            >
              Search
            </Typography>
             <TextField
              id="outlined-search"
              label="Search members"
              type="search"
              onChange={searchMembers}
            /> 
          </Stack>*/}

          <Stack>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ color: 'rgb(119, 119, 119)' }}
            >
              Sort by status
            </Typography>
            <ToggleButtonGroup
              value={sortStatus}
              exclusive
              onChange={handleStatusSort}
              aria-label="text alignment"
            >
              <ToggleButton value="online" aria-label="left aligned">
                <Typography>Live</Typography>
              </ToggleButton>
              <ToggleButton value="offline" aria-label="centered">
                <Typography>Offline</Typography>
              </ToggleButton>
              <ToggleButton value="all" aria-label="centered">
                <Typography>All</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ color: 'rgb(119, 119, 119)' }}
            >
              Sort streams
            </Typography>
            <ToggleButtonGroup
              value={sortList}
              exclusive
              onChange={handleSortList}
              aria-label="text alignment"
            >
              <ToggleButton value="viewers_high" aria-label="centered">
                <ArrowUpwardIcon />
                <Typography>Viewers</Typography>
              </ToggleButton>
              <ToggleButton value="viewers_low" aria-label="centered">
                <ArrowDownwardIcon />
                <Typography>Viewers</Typography>
              </ToggleButton>
              <ToggleButton value="az" aria-label="left aligned">
                <Typography>A {'->'} z</Typography>
              </ToggleButton>
              <ToggleButton value="za" aria-label="centered">
                <Typography>Z {'->'} A</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <div className="cards">
          {streams?.length === 0 ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              spacing={2}
              sx={{ marginTop: 1, marginBottom: 6 }}
            >
              <Typography variant="h6">Couldn't find any streams</Typography>
              <img
                src={SadgeEmote}
                style={{ margin: 0, marginLeft: 5 }}
                alt="logo"
              />
            </Stack>
          ) : (
            streams?.map((item, ind) => (
              <>{item ? StreamerCard(item, loaded, ind) : <p>Loading</p>}</>
            ))
          )}
        </div>
      </div>
      {streams?.length === 0 ? (
        <></>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          sx={{ marginTop: 6 }}
        >
          <IconButton
            aria-label="pagination-backward"
            disabled={currentPage === 1 ? true : false}
            onClick={() => {
              setActualPage(actualPage - 1)
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          {buttons.map((bttn) => bttn)}
          <IconButton
            aria-label="pagination-forward"
            disabled={currentPage === totalPages ? true : false}
            onClick={() => {
              setActualPage(actualPage + 1)
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      )}

      {streams?.length === 0 ? (
        <></>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          sx={{ marginTop: 1, marginBottom: 6 }}
        >
          <Typography>
            Page {currentPage}/{totalPages}
          </Typography>
          <Typography>Total: {totalResults}</Typography>
        </Stack>
      )}

      {/* <Pagination currentPage={currentPage} totalPages={totalPages} /> */}
    </div>
  )
}

export default Home
