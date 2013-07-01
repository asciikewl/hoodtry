
function takepic(error) {
    $(navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
 
    destinationType: Camera.DestinationType.DATA_URL
 
 }); 

      }
 
function onSuccess(imageData) {
 
    var image = document.getElementById('myImage');
 
    image.src = "data:image/jpeg;base64," + imageData;
 
}
 
 
 
function onFail(message) {
 
    alert('Failed because: ' + message);
 
}




















// use an existing photo from the library:
useExistingPhoto: function(e) {
  this.capture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
};

// take a new photo:
takePhoto: function(e) {
  this.capture(Camera.PictureSourceType.CAMERA);
};

// capture either new or existing photo:
capture: function(sourceType) {
  navigator.camera.getPicture(this.onCaptureSuccess, this.onCaptureFail, {
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    correctOrientation: true
  });
};

// if photo is captured successfully, then upload to server:
onCaptureSuccess: function(imageURI) {
  var fail, ft, options, params, win;
  // callback for when the photo has been successfully uploaded:
  success: function(response) {
    alert("Your photo has been uploaded!");
  };
  // callback if the photo fails to upload successfully.
  fail: function(error) {
    alert("An error has occurred: Code = " + error.code);
  };
  options = new FileUploadOptions();
  // parameter name of file:
  options.fileKey = "my_image";
  // name of the file:
  options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
  // mime type:
  options.mimeType = "text/plain";
  params = {
    val1: "some value",
    val2: "some other value"
  };
  options.params = params;
  ft = new FileTransfer();
  ft.upload(imageURI, 'http://example.com/path/to/service', success, fail, options);
};

// there was an error capturing the photo:
onCaptureFail: function(message) {
  alert("Failed because: " + message);
};
