import { Button, IconButton, Stack } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface IPagination {
  totalPages: number
  currentPage: number
  setActualPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({
  totalPages,
  currentPage,
  setActualPage,
}: IPagination) => {
  const buttons = []
  for (let index = 0; index < totalPages; index++) {
    const num = index + 1
    buttons.push(
      <Button
        key={num}
        variant="contained"
        onClick={() => {
          setActualPage(num)
        }}
      >
        {num}
      </Button>,
    )
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
      sx={{ marginTop: 6, marginBottom: 6 }}
    >
      <IconButton
        aria-label="pagination-backward"
        disabled={currentPage === 1 ? true : false}
      >
        <ArrowBackIosIcon />
      </IconButton>
      {buttons.map((bttn) => bttn)}
      <IconButton
        aria-label="pagination-forward"
        disabled={currentPage === totalPages ? true : false}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  )
}

export default Pagination
