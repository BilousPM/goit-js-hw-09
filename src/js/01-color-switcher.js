const refs = {
    buttonStartEl: document.querySelector('button[data-start]'),
    buttonStopEl: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body')
};

refs.buttonStopEl.setAttribute("disabled", true);
let intervalId = null;

refs.buttonStartEl.addEventListener('click', onChangeColor);
refs.buttonStopEl.addEventListener('click', stopChangeColorSetBody);

function onChangeColor() {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
    refs.buttonStopEl.removeAttribute("disabled")
    refs.buttonStartEl.setAttribute("disabled", true);

    intervalId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)
};

function stopChangeColorSetBody() {
    refs.buttonStartEl.removeAttribute("disabled");
    refs.buttonStopEl.setAttribute("disabled", true);
    clearInterval(intervalId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



// refs.buttonStartEl.style.width = "80px";
// refs.buttonStartEl.style.height = "40px";
// refs.buttonStopEl.style.width = "80px";
// refs.buttonStopEl.style.height = "40px";
