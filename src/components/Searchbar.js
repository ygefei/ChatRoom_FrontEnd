import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {useAuth} from '../context';
import {joinRoomSocket} from '../socketUtil';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.secondary.light,
    width: 150,
    height: 30

  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 5,
  },
  iconButton: {
    padding: 10
  }
}));

export default function Searchbar() {
  const classes = useStyles();
  const [joinRoomId, setjoinRoomId] = React.useState("");
  let auth = useAuth();
  let dispatch = useDispatch();


  const handleJoinRoom = (event) => {
      event.preventDefault();
      if(!joinRoomId){
        alert("You should input room id!");
        return;
      }
      joinRoomSocket(dispatch,joinRoomId,auth.user);
      setjoinRoomId("");
  }


  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Join By Room ID"
        inputProps={{ "aria-label": "search google maps" }}
        value={joinRoomId}
        onChange={(event) => setjoinRoomId(event.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(event) => handleJoinRoom(event)}
      >
        <SearchIcon fontSize='small'/>
      </IconButton>
    </Paper>
  );
}