import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

class Upload extends Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("http://localhost:5000/contents/upload", fd, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />

        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default Upload;
