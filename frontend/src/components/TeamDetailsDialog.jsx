import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';

const TeamDetailsDialog = ({ open, team, onClose }) => {
  if (!team) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="team-details-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="team-details-dialog-title">
        Team Details: {team.teamName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Team Captain
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {team.captain.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {team.captain.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {team.captain.phone}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Team Members ({team.members.length})
        </Typography>
        
        {team.members.length > 0 ? (
          <List>
            {team.members.map((member, index) => (
              <ListItem key={index} divider={index < team.members.length - 1}>
                <ListItemText
                  primary={member.name}
                  secondary={member.email}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No team members added.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamDetailsDialog;
