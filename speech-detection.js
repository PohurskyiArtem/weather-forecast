window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.addEventListener('onload', checkMicro);

var check = false;
var microOn = document.getElementById('speech-detection-on');
var recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
microOn.addEventListener('click', checkMicro);

function checkMicro(){
  if(check === false){
    check = true;
    recognition.start();
  }else{
    check = false;
    recognition.stop()
  }
}



recognition.addEventListener('result', function (event) {
  city.textContent = Array
    .from(event.results)
    .map(function (results) {
      return results[0];
    })
    .map(function (results) {
      return results.transcript;
    })
    .join('');
});

