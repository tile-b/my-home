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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import curtain from '../icons/curtains.png';
import blinds from '../icons/blinds.png';
import carpet from '../icons/carpet.png';
import handrail from '../icons/handrail.png';
import net from '../icons/net.png';
import pvc from '../icons/pvc.png';
import plus from '../icons/plus.png';


const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: '8px 0', // Increased padding
  '& .MuiMenuItem-root': {
    fontWeight: 'bold',
    fontSize: '1.2rem', // Larger font size
    padding: '15px 16px', // More padding for each item
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1.5),
    },
    '&:hover': {
      backgroundColor: '#c4c4c4', // rgb(145 142 138)
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
  minWidth: 240, // Increased from 180 to make dropdown wider
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

// Styled component for the nested submenu items
const NestedMenuItem = styled(MenuItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  '&&': {  // Double ampersand increases specificity
    fontSize: '0.95rem',
  },
  minHeight: '52px', // Increased from 32px
  maxHeight: '40px',
  color:'#6c6c78'
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
  
  // Zavjese submenu items
  const zavjeseItems = [
    'Zebra zavjese',
    'Trakaste zavjese',
    'Panel zavjese',
    'Paravan-Zavjese'
  ];
  
  // Usluge submenu items (other than Zavjese)
  const otherUslugeItems = [
    { text: 'PVC Stolarija', icon:  <img src={pvc} alt="Z" width="38" height="38" style={{paddingRight: '10px'}}/> },
    { text: 'Tepisi', icon: <img src={carpet} alt="Z" width="38" height="38" style={{paddingRight: '10px'}}/>  },
    { text: 'Zaluzine', icon: <img src={blinds} alt="Z" width="38" height="38" style={{paddingRight: '10px'}}/>  },
    { text: 'Ograde', icon: <img src={handrail} alt="Z" width="38" height="38" style={{paddingRight: '10px'}}/>  },
    { text: 'Komarnici', icon: <img src={net} alt="Z" width="38" height="38" style={{paddingRight: '10px'}}/>  },
    { text: 'Ostalo', icon: <img src={plus} alt="Z" width="38" height="38" style={{paddingRight: '10px'}}/>  }
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
                  height: 60,
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
                  fontSize: '1rem',
                  color: '#3f4046', 
                  textTransform: 'none',
                  '&:hover': {
                    color: 'white',backgroundColor: 'rgb(145 142 138)'
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
                  fontSize: '1rem',
                  color: '#3f4046', 
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgb(145 142 138)', color: 'white',
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
                          {/* Zavjese category header */}
                          <MenuItem onClick={handleClose} disableRipple>
                          <img src={curtain} alt="Z" width="40" height="40" style={{paddingRight: '10px'}}/> 
  Zavjese
</MenuItem>
                          
                          {/* Zavjese submenu items - always visible */}
                          {zavjeseItems.map((subItem, idx) => (
                            <NestedMenuItem key={idx} onClick={handleClose} disableRipple>
                              <ArrowRightIcon sx={{ fontSize: 14 }} />
                              {subItem}
                            </NestedMenuItem>
                          ))}
                          
                          {/* Divider between Zavjese and other items */}
                          <Divider sx={{ my: 1 }} />
                          
                          {/* Other items without submenu */}
                          {otherUslugeItems.map((item, idx) => (
                            <MenuItem key={idx} onClick={handleClose} disableRipple>
                              {item.icon}
                              {item.text}
                            </MenuItem>
                          ))}
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
                    {/* Zavjese heading */}
                    <MenuItem 
                      sx={{ 
                        pl: 4,
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '36px' }}>
                      <img src={curtain} alt="Z" width="38" height="38" style={{paddingRight: '10px'}} /> 
                      </ListItemIcon>
                      <ListItemText primary="Zavjese" />
                    </MenuItem>
                    
                    {/* Zavjese submenu items - always visible */}
                    {zavjeseItems.map((subItem, idx) => (
                      <MenuItem 
                        key={idx}
                        sx={{ 
                          pl: 6,
                          fontSize: '0.85rem',
                          minHeight: '32px'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <ArrowRightIcon sx={{ fontSize: 14 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={subItem} 
                          primaryTypographyProps={{ 
                            fontSize: '0.85rem' 
                          }} 
                        />
                      </MenuItem>
                    ))}
                    
                    {/* Other Usluge items */}
                    {otherUslugeItems.map((item, index) => (
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
                        <InstagramIcon sx={{ fontSize: 30 }} />
                      </IconButton>
                    </Link>
                    <Link href="tel:+38763020909" target="_blank" rel="noopener noreferrer">
                      <IconButton aria-label="WhatsApp">
                        <WhatsAppIcon sx={{ fontSize: 30 }} />
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