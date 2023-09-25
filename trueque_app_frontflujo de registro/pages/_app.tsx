import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { pink } from '@mui/material/colors'
import { AppProps } from 'next/app'

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#f1c606',
    },

    secondary: {
      main: '#19857b',
    },
    error: {
      main: pink[700],
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#f1c606',
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
