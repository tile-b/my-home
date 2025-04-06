import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import logo from '../../images/logoMyHome.png';
import Grow from '@mui/material/Grow';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from '@mui/material';

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: '4px 0',
  '& .MuiMenuItem-root': {
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1.5),
    },
    '&:active': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 6,
  marginTop: theme.spacing(1),
  minWidth: 180,
  color: 'rgb(55, 65, 81)',
  boxShadow:
    'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [openPopper, setOpenPopper] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoverTimer, setHoverTimer] = React.useState(null);
  const [mobileUslugeOpen, setMobileUslugeOpen] = React.useState(false);

  // Mouse enter handler for dropdown
  const handleMouseEnter = (event) => {
    clearTimeout(hoverTimer);
    setAnchorEl(event.currentTarget);
    setOpenPopper(true);
  };
  
  // Mouse leave handler with delay
  const handleMouseLeave = () => {
    setHoverTimer(
      setTimeout(() => {
        setOpenPopper(false);
      }, 300) // 300ms delay before closing
    );
  };
  
  // For the menu itself
  const handleMenuMouseEnter = () => {
    clearTimeout(hoverTimer);
  };
  
  const handleMenuMouseLeave = () => {
    handleMouseLeave();
  };

  const handleClose = () => {
    setOpenPopper(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset mobile submenu state when drawer closes
      setMobileUslugeOpen(false);
    }
  };

  const toggleMobileUsluge = () => {
    setMobileUslugeOpen(!mobileUslugeOpen);
  };

  const navItems = ['Početna', 'O Nama', 'Galerija', 'Kontakt'];
  
  // Usluge submenu items
  const uslugeItems = [
    { text: 'Zavjese', icon: <MoreHorizIcon /> },
    { text: 'PVC Stolarija', icon: <MoreHorizIcon /> },
    { text: 'Tepisi', icon: <MoreHorizIcon /> },
    { text: 'Zaluzine', icon: <MoreHorizIcon /> },
    { text: 'Ograde', icon: <MoreHorizIcon /> }
  ];

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              disableRipple={false}
              color="inherit"
              sx={{
                padding: 0,
                minWidth: 0,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'transparent', // disables hover background
                },
                '& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible': {
                  backgroundColor: 'rgba(255,255,255,0.3)', // white-ish ripple
                },
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: 55,
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
            </Button>
          </Box>

          {/* Right: Nav items */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2,
              alignItems: 'center',
              
            }}
          >
            {/* Regular nav items */}
            {navItems.map((item, index) => (
              <Button
                key={item}
                variant="text"
                size="medium"
                sx={{ 
                  color: '#5a5a61', 
                  textTransform: 'none',
                  '&:hover': {
                    color: 'white',backgroundColor: 'transparent'
                  }, 
                  fontWeight: 'bold',
                }}
              >
                {item}
              </Button>
            ))}

            {/* Usluge dropdown - separate from the array */}
            <div>
              <Button
                aria-controls={openPopper ? 'usluge-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openPopper ? 'true' : undefined}
                variant="text"
                size="medium"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ 
                  color: '#5a5a61', 
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent', color: 'white',
                  },
                  fontWeight: 'bold', 
                }}
              >
                Usluge
              </Button>
              
              <Popper
                id="usluge-menu"
                open={openPopper}
                anchorEl={anchorEl}
                placement="bottom-start"
                transition
                disablePortal={false}
                modifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 10],
                    },
                  },
                ]}
                style={{ zIndex: 1300 }}
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: 'top left' }}
                  >
                    <StyledPaper 
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <StyledMenuList autoFocusItem={false}>
                          <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            Zavjese
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            PVC Stolarija
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            Tepisi
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            Zaluzine
                          </MenuItem>
                          <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            Ograde
                          </MenuItem>
                        </StyledMenuList>
                      </ClickAwayListener>
                    </StyledPaper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Box>

          {/* Mobile: Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none', } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: '#f0f0f0' }} />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: '#b5b5b5', color: '#545559' }}> 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Navigation items */}
                {navItems.map((item) => (
  <MenuItem key={item} sx={{ fontWeight: 'bold' }}>
    {item}
  </MenuItem>
))}

                
                {/* Usluge with submenu */}
                <MenuItem 
                  onClick={toggleMobileUsluge}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    backgroundColor: mobileUslugeOpen ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
                  }}
                >
                  <Box sx={{fontWeight: 'bold', color: '#545559'}}>Usluge</Box>
                  {mobileUslugeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </MenuItem>
                
                {/* Collapsible submenu for Usluge */}
                <Collapse in={mobileUslugeOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {uslugeItems.map((item, index) => (
                      <MenuItem 
                        key={index}
                        sx={{ 
                          pl: 4,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </MenuItem>
                    ))}
                  </List>
                </Collapse>

                <Divider sx={{ my: 2 }} />

{/* Social links and icons in same row */}

<Box sx={{ 
  mt: 1, 
  px: 2, 
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
    Pronađite nas
  </Typography>
  <Box>
    <Link href="https://www.instagram.com/myhome_samac/" target="_blank" rel="noopener noreferrer">
      <IconButton aria-label="Instagram" sx={{ mr: 1 }}>
        <InstagramIcon sx={{ fontSize: 24 }} />
      </IconButton>
    </Link>
    <Link href="tel:+38763020909" target="_blank" rel="noopener noreferrer">
      <IconButton aria-label="WhatsApp">
        <WhatsAppIcon sx={{ fontSize: 24 }} />
      </IconButton>
    </Link>
  </Box>
</Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default AppAppBar;