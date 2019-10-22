function registerUser() {
  var name = document.forms["registerUser"]["name"].value;
  alert("Name must be filled out");
  console.log("here");
  return false;
  if (x == "") {
      alert("Name must be filled out");
      $(".form-group:first").addClass("has-error");
      return false;
  }
}
