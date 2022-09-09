import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useAppContext } from '../../context/context'
import { sortByViewcount } from '../../utils/utils'
import StreamCard from './Card'
import SearchIcon from '@mui/icons-material/Search'
import { getSettings, setSetting } from '../../utils/settings'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useEffect } from 'react'
import ReactGA from 'react-ga'

const Streams = () => {
  useEffect(() => {
    document.title = 'Golden Gator | Streams'
    ReactGA.pageview('streams')
  })

  const {
    appState: { streams },
  } = useAppContext()

  const settings = getSettings()

  const [viewerSort, setViewerSort] = useState<'ascending' | 'descending'>(
    settings.viewer_sort || 'descending',
  )
  // Keeps track for searching usernames/display names and by game.
  const [search, setSearch] = useState<string>('')
  const [multiStreams, setMultiStreams] = useState<string[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleMultiStreamClick = (login: string) => {
    if (multiStreams.includes(login)) {
      // Remove it from multi-streams
      setMultiStreams(multiStreams.filter((name) => name !== login))
    } else {
      // Add it to multi-streams
      setMultiStreams([...multiStreams, login])
    }
  }

  const clearMultiStream = () => {
    setMultiStreams([])
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const handleSearch = (streams: Stream[]) => {
    return streams.filter((s) => {
      const gameMatches = s.game.toLowerCase().includes(search.toLowerCase())
      const nameMatches = s.member.login
        .toLowerCase()
        .includes(search.toLowerCase())
      const displayNameMatches = s.member.display_name
        .toLowerCase()
        .includes(search.toLowerCase())

      return gameMatches || nameMatches || displayNameMatches
    })
  }

  return (
    <Container maxWidth={false}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Copied multistream link to clipboard!
        </Alert>
      </Snackbar>
      <Stack direction="column" spacing={1}>
        <Box sx={{ marginBottom: 2 }}>
          <Grid container alignItems="center">
            <Grid>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 300,
                    maxWidth: '100%',
                  }}
                >
                  <TextField
                    value={search}
                    onChange={handleSearchChange}
                    variant="standard"
                    label=" "
                    placeholder="Search by username or game..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Stack direction="column" spacing={1}>
                  <Box>
                    <Typography> </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Box>
                      <Button
                        onClick={() => {
                          setViewerSort(
                            viewerSort === 'descending'
                              ? 'ascending'
                              : 'descending',
                          )
                          setSetting(
                            'viewer_sort',
                            viewerSort === 'descending'
                              ? 'ascending'
                              : 'descending',
                          )
                        }}
                        variant={'contained'}
                      >
                        {viewerSort === 'descending' ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                        Viewers
                      </Button>
                    </Box>

                    {/* <Box>
                      <Button
                        onClick={() => {
                          setViewerSort('ascending')
                          setSetting('viewer_sort', 'ascending')
                        }}
                        variant={
                          viewerSort === 'ascending' ? 'contained' : 'outlined'
                        }
                      >
                        <ArrowDownwardIcon />
                        Viewers
                      </Button>
                    </Box> */}
                  </Stack>
                </Stack>

                {/* <ToggleButtonGroup
                  value={viewerSort}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="viewer sort"
                >
                  <ToggleButton value="descending" aria-label="viewers up">
                    <ArrowDownwardIcon />
                    Viewers
                  </ToggleButton>
                  <ToggleButton value="ascending" aria-label="viewers down">
                    <ArrowUpwardIcon />
                    Viewers
                  </ToggleButton>
                </ToggleButtonGroup> */}
              </Stack>
            </Grid>
            <Grid sx={{ marginLeft: 'auto' }}>
              {/* Multi-stream */}
              <Stack direction="column" spacing={1}>
                <Box>
                  <Typography> </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    disabled={multiStreams.length === 0 ? true : false}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://www.multitwitch.tv/${multiStreams
                          .join('/')
                          .toLowerCase()}`,
                      )

                      setSnackbarOpen(true)
                    }}
                  >
                    Create Multi-Stream Link
                  </Button>
                  <Button
                    variant="contained"
                    disabled={multiStreams.length === 0 ? true : false}
                    onClick={clearMultiStream}
                  >
                    Clear Selection
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid
            key={'streams-grid'}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ marginBottom: 2 }}
          >
            {handleSearch(sortByViewcount(viewerSort, streams)).map(
              (stream: Stream | null, ind: number) => (
                <StreamCard
                  key={ind}
                  index={ind}
                  stream={stream}
                  multiStreams={multiStreams}
                  handleMultiStreamClick={handleMultiStreamClick}
                  settings={settings}
                />
              ),
            )}
          </Grid>
        </Box>
      </Stack>
    </Container>
  )
}

export default Streams
