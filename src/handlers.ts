import { moveNext, movePrev, restart, play, pause } from "./controller";

document.addEventListener("DOMContentLoaded", main);

window.addEventListener("transitionAmountChanged", function (event: CustomEventInit<{ value: number }>) {
    document.querySelector("#frames-slider").setAttribute("max", event.detail.value.toString());
});

window.addEventListener("transitionIndexChanged", function (event: CustomEventInit<{ value: number }>) {
    (document.querySelector("#frames-slider") as HTMLSelectElement).value = event.detail.value.toString();
});

function main() {
    document.querySelector("#controls__buttons form").addEventListener("submit", function (e) {
        e.preventDefault();
        const string = (document.querySelector("#input-string") as HTMLInputElement).value;

        restart(string);
    });

    // Button click.
    document.querySelector("#frames-button--prev").addEventListener("click", movePrev);
    document.querySelector("#frames-button--next").addEventListener("click", moveNext);

    // Keyboard key press.
    document.addEventListener("keydown", function (event) {
        if (event.key == "ArrowLeft") {
            movePrev();
        } else if (event.key == "ArrowRight") {
            moveNext();
        }
    });

    // Play/Pause button.
    const playButton = document.querySelector("#button-pause-play");

    playButton.addEventListener("click", function () {
        const button = this as HTMLButtonElement;
        if (button.textContent == "Play") {
            play();
        } else {
            pause();
        }
    });

    window.addEventListener("animationStarted", function () {
        playButton.textContent = "Pause";
    });

    window.addEventListener("animationPaused", function () {
        playButton.textContent = "Play";
    });

    window.addEventListener("animationRestarting", function () {
        playButton.classList.add("bring-attention");
        setTimeout(() => playButton.classList.remove("bring-attention"), 3500);
    });
}
