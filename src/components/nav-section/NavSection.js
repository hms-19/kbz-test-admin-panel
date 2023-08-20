import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { Chat, Dashboard } from '@mui/icons-material';
import { StyledNavItem, StyledNavItemIcon } from './styles';


export default function NavSection() {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
          <StyledNavItem
            component={RouterLink}
            to='/blogs'
            sx={{
              '&.active': {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightBold',
              },
            }}
          >
            <StyledNavItemIcon>
                <Dashboard />
            </StyledNavItemIcon>

            <ListItemText disableTypography primary='Blogs' />
          </StyledNavItem>
      </List>
    </Box>
  );
}
