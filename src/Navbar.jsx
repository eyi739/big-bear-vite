import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown'
       && (event.key === 'Tab') || event.key === 'Shift')
     {
        return;
    }
    setOpen(open);
  }
  
  return (
    <Box sx={{ 
      flexGrow: 1, 
    }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: {xs: 'block', sm: 'none'} }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
          // from which side the drawer slides in
          anchor="right" 
 
          //if and how easily the drawer can be closed
          variant="temporary"
 
          //if open is true, drawer is shown
          open={open} 
          
          //function that is called when the drawer should close
          onClose={toggleDrawer(false)} 
          
          //function that is called when the drawer should open
          onOpen={toggleDrawer(true)}
        >
            <Box>
              {/* The inside of the drawer */}
            </Box>
        </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Big Bear Market
          </Typography>
          <Button color="inherit">Login here</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}