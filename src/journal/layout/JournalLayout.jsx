import { Box } from '@mui/material'
import { NavBar } from '../components'

const drawerWidth = 240

// eslint-disable-next-line react/prop-types
export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar drawerWidth={drawerWidth} />

      {/* Sidebar drawerWidth*/}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        {children}
      </Box>
    </Box>
  )
}
