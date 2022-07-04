import {
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  List,
  Snackbar,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'

function Tools() {
  document.title = 'GoldenGator | Tools'
  const [randomizerValues, setRandomizerValues] = useState<string>()
  const [sortedArray, setSortedArray] = useState<string[]>([])
  const [sortMethod, setSortMethod] = React.useState('randomize')
  const [copyClipboardSnackbar, setCopyClipboardSnackbar] = useState<boolean>(
    false,
  )

  const handleInputChange = (e: any) => {
    const { value } = e.target
    setRandomizerValues(value)
  }

  const handleSubmit = (event: any) => {
    console.log(event)
    event.preventDefault()
    const parsed = randomizerValues?.split('\n')
    if (!parsed) return

    switch (sortMethod) {
      case 'randomize':
        setSortedArray(
          parsed?.sort(function (a, b) {
            return 0.5 - Math.random()
          }),
        )
        break
      case 'alphabetical':
        setSortedArray(parsed?.sort())
        break
    }
  }

  // Copy list button
  const handleCopyListButton = () => {
    if (sortedArray.length === 0) return false
    navigator.clipboard.writeText(sortedArray.join('\n'))
    setCopyClipboardSnackbar(true)
    handleCopyListButtonSnackbarOpen()
    return true
  }

  const handleCopyListButtonSnackbarOpen = () => {
    setCopyClipboardSnackbar(true)
  }

  const handleCopyListButtonSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setCopyClipboardSnackbar(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCopyListButtonSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setSortMethod(newAlignment)
    }
  }

  return (
    <Container sx={{ align: 'center', justifyContent: 'center', marginTop: 9 }}>
      <form onSubmit={handleSubmit}>
        <Divider textAlign="left" sx={{ color: 'white' }}>
          LISTS
        </Divider>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={12}
          sx={{ color: 'white', width: '100' }}
        >
          <FormControl>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                id="filled-multiline-static"
                label="List of values seperated by a new line"
                multiline
                rows={15}
                fullWidth
                defaultValue={sortedArray}
                variant="filled"
                focused
                onChange={handleInputChange}
                sx={{ width: '500px', height: 'auto', marginTop: 1 }}
              />
            </Stack>
          </FormControl>
          <List>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                id="filled-multiline-static"
                multiline
                rows={15}
                label="Result"
                fullWidth
                variant="filled"
                focused
                defaultValue={sortedArray
                  .map((v, i) => `${i + 1}. ${v}\n`)
                  .join('')}
                onChange={handleInputChange}
                sx={{ width: '500px', height: 'auto', marginTop: 1 }}
              />
              <Snackbar
                open={copyClipboardSnackbar}
                autoHideDuration={4000}
                onClose={handleCopyListButtonSnackbarClose}
                message="Copied to clipboard."
                action={action}
              />
            </Stack>
          </List>

          {sortedArray.length !== 0 ? <></> : <></>}
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: 4 }}
        >
          <ToggleButtonGroup
            value={sortMethod}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="randomize"
              aria-label="centered"
              title="Randomize"
            >
              <ShuffleIcon />
            </ToggleButton>
            <ToggleButton
              value="alphabetical"
              aria-label="right aligned"
              title="Alphabetical"
            >
              <SortByAlphaIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopyListButton}
            sx={{ marginTop: 2.3 }}
          >
            Copy to clipboard
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default Tools
