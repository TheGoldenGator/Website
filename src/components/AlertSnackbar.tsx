import { forwardRef, useCallback } from 'react'
import { makeStyles } from '@mui/styles'
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { Grid } from '@mui/material'

const useStyles = makeStyles(() => ({
  root: {
    '@media (min-width:600px)': {
      minWidth: '344px !important',
    },
  },
  card: {
    width: '100%',
    color: 'white',
  },
  typography: {
    color: '#fff',
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
    justifyContent: 'space-between',
  },
  icons: {
    color: 'white',
    marginLeft: 'auto',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    color: '#fff',
    transition: 'all .2s',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  paper: {
    backgroundColor: '#fff',
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: 'none',
  },
}))

interface ReportCompleteProps extends CustomContentProps {
  id: number
  allowDownload?: boolean
  pfp: string
  username: string
  event: 'stream.online' | 'stream.offline' | 'title.update' | 'game.update'
}

const ReportComplete = forwardRef<HTMLDivElement, ReportCompleteProps>(
  ({ id, ...props }, ref) => {
    const classes = useStyles()
    const { closeSnackbar } = useSnackbar()
    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    const generateMessage = () => {
      switch (props.event) {
        case 'stream.online':
          return (
            <Typography>
              <strong>{props.username}</strong> went online.
            </Typography>
          )

        case 'stream.offline':
          return (
            <Typography>
              <strong>{props.username}</strong> went offline.
            </Typography>
          )

        case 'title.update':
          return <Typography>New title: {props.message}</Typography>

        case 'game.update':
          return <Typography>Changed game to: {props.message}</Typography>

        default:
          break
      }
    }

    const generateColor = () => {
      switch (props.event) {
        case 'stream.online':
          return `rgb(12, 19, 13)`

        case 'stream.offline':
          return `rgb(22, 11, 11)`

        case 'title.update':
          return `rgb(7, 19, 24)`

        case 'game.update':
          return `rgb(7, 19, 24)`

        default:
          break
      }
    }

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card
          className={classes.card}
          sx={{ backgroundColor: generateColor() }}
        >
          <CardActions classes={{ root: classes.actionRoot }}>
            <Stack>
              <Grid>
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item>
                    <img
                      style={{ width: 42, height: 42, borderRadius: '50%' }}
                      alt="pfp"
                      src={props.pfp}
                    />
                  </Grid>
                  <Grid item>
                    <Stack direction="column">
                      {props.event === 'game.update' ||
                      props.event === 'title.update' ? (
                        <Typography variant="body2">
                          <strong>{props.username}</strong>
                        </Typography>
                      ) : (
                        <></>
                      )}
                      <Typography
                        variant="body2"
                        className={classes.typography}
                      >
                        {generateMessage()}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
            <div className={classes.icons}>
              <IconButton
                size="small"
                className={classes.expand}
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </SnackbarContent>
    )
  },
)

ReportComplete.displayName = 'ReportComplete'

export default ReportComplete
