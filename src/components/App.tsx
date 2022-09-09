import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Base } from './Base/Base'
import Streams from './Streams/Streams'
import Members from './Members/Members'
import { ThemeProvider } from '@mui/system'
import { theme } from '../theme'
import { CssBaseline } from '@mui/material'
import Member from './Members/Member'
import About from './About/About'
import { SnackbarProvider } from 'notistack'
import ReportComplete from './AlertSnackbar'
import AppProvider from '../context/context'
import Settings from './Settings/Settings'

declare module 'notistack' {
  interface VariantOverrides {
    reportComplete: {
      pfp: string
      username: string
      event: 'stream.online' | 'stream.offline' | 'title.update' | 'game.update'
    }
  }
}

const App = () => {
  return (
    <div>
      <SnackbarProvider
        Components={{
          reportComplete: ReportComplete,
        }}
        dense
        maxSnack={10}
      >
        <AppProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Base />}>
                  <Route path="/streams" element={<Streams />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/members/:memberId" element={<Member />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AppProvider>
      </SnackbarProvider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
