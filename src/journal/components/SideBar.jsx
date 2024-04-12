import { TurnedInNot } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'

// eslint-disable-next-line react/prop-types
export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Diego Soto
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
            <ListItem key={crypto.randomUUID()} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container direction="column">
                  <ListItemText primary={text} />
                  <ListItemText primary={'Lorem ipsum dolor sit amet.'} />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
