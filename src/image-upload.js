import React from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase/firebase";
import FileUploader from "react-firebase-file-uploader";
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel'

export class UploadImage extends React.Component {
  state = {
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0
  };

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
    this.props.updatePhotoUrl(downloadURL);

    this.setState(oldState => ({
      isUploading: false
    }));
  };

  render() {
    const {photoUrl} = this.props;
    return (
      <div>
        {this.props.photoUrl === '' && (
          <label style={{
            backgroundColor: 'steelblue',
            color: 'white',
            padding: 10,
            borderRadius: 4,
            margin: 15,
            pointer: 'cursor'
          }}>
            Select your Business's Image

            <FileUploader
              hidden
              accept="image/*"
              name="image-uploader-multiple"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
            />
          </label>
        )}

        {this.props.photoUrl !== '' && (
          <div>
            <IconButton onClick={() => this.props.updatePhotoUrl('')}> <CancelIcon/></IconButton>
            <img style={{
              maxHeight: '500px',
              maxWidth: '500px',
              height: 'auto',
              width: 'auto'
            }} src={photoUrl}/>
          </div>
        )}

      </div>
    );
  }
}


