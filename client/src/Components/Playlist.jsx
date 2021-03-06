import React, { Component } from "react";
import { Table } from "react-bootstrap";
import SocketIOClient from 'socket.io-client';

var socket ='';

class SongQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:7000",
      playlist: [],
    };

    socket = SocketIOClient(this.state.endpoint);

    socket.on("add_song", video => {
      const songs = this.state.playlist.concat(video);
      this.setState({ playlist: songs });
      console.log("playlist", this.state.playlist);
    });
  }


  playlistRender () {
    const { playlist } = this.state;
    return (
      <Table responsive="sm" id="playlistTable" class="table">
        <thead>
          <tr>
            <th>Song Queue</th>
            <th>Channel</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {playlist.map((song, index) => (
          <tr key={index} id={index}>
            <td key={song.id.videoId}>{song.snippet.title}</td>
            <td key={song.id.videoId}>{song.snippet.channelTitle}</td>
            <td key={song.id.videoId}>0:00</td>
          </tr>
          ))}
        </tbody>
      </Table>
    )
  };

  render() {
    return this.playlistRender();
  }
}

export default SongQueue;
