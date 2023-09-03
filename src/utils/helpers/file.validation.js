var path = require("path");

exports.fileValidation = (file) => {
  var allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".avi",
    ".gif",
    ".doc",
    ".pdf",
  ]; //add as per requirements
  var fileExtension = path.extname(file.name);
  if (!allowedExtensions.includes(fileExtension)) {
    return { status: false, message: "Invalid File Type" };
  }
  if (file.size > 12 * 1024 * 1024) {
    //12 MB limit
    return { status: false, message: "File Size is to Large" };
  }
  return { status: true };
};
