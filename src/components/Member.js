import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {API_BASE} from '../api';


export default function Member(props) {
    const {user} = props;
    return(
        <div>
            <ListItem>
                  <ListItemAvatar>
                      <Avatar alt={user.nickname} src={`${API_BASE}/${user.profile}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.nickname}
                  />
              </ListItem>
        </div>
    );
}