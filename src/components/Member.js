import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default function Member(props) {
    const {user} = props;
    return(
        <div>
            <ListItem>
                  <ListItemAvatar>
                      <Avatar alt={user.nickname} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.nickname}
                  />
              </ListItem>
        </div>
    );
}