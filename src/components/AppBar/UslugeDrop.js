import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
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
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function UslugeDrop() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  // Delay timer for smoother hover experience
  const [hoverTimer, setHoverTimer] = React.useState(null);
  
  // Mouse enter handler
  const handleMouseEnter = (event) => {
    clearTimeout(hoverTimer);
    setAnchorEl(event.currentTarget);
  };
  
  // Mouse leave handler with delay
  const handleMouseLeave = () => {
    setHoverTimer(
      setTimeout(() => {
        setAnchorEl(null);
      }, 300) // 300ms delay before closing to allow moving to menu
    );
  };
  
  // For the menu itself
  const handleMenuMouseEnter = () => {
    clearTimeout(hoverTimer);
  };
  
  const handleMenuMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          background: 'none'
        }}
      >
        Usluge
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
          onMouseEnter: handleMenuMouseEnter,
          onMouseLeave: handleMenuMouseLeave,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        // Make sure menu doesn't block other interactions
        disableScrollLock={true}
        disablePortal={false}
        // Set clickaway listener to false so clicking elsewhere doesn't close menu
        disableAutoFocusItem={true}
        hideBackdrop={true}
      >
        <MenuItem onClick={() => setAnchorEl(null)} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => setAnchorEl(null)} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
    </div>
  );
}