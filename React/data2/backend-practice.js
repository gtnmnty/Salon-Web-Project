// Creates new http message, set it up, and sends it to the server
const xhr = new XMLHttpRequest();

// Set up event listener first before sending the request
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();
//xhr.response