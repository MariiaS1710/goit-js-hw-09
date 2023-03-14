
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStop.disabled = true;
let colorInterval = null;

btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    btnStop.disabled = false;

    colorInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
})

btnStop.addEventListener('click', () => {
    clearInterval(colorInterval);
    btnStart.disabled = false;
    btnStop.disabled = true;

})
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

