import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

export default function ChatRoom() {
  const classes = useStyles();

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="COMP 426" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="COMP 426"
          secondary={
            <React.Fragment>
              <Typography
                variant="body2"
                className={classes.inline}
                // color="textPrimary"
              >
                Elfin Yang
              </Typography>
              {": I'll be in your neighborhood doing…"}
            </React.Fragment>
          }
        />
      <Typography variant="overline">7:00</Typography>
      </ListItem>  
      <Divider variant="fullWidth" component="li" />
    </div>
  );
}
