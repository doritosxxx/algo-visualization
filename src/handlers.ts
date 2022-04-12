import { moveNext, movePrev, restart } from "./controller";

document.addEventListener("DOMContentLoaded", main);

window.addEventListener("transitionAmountChanged", function (event: CustomEventInit<{ value: number }>) {
    document.querySelector("#frames-slider").setAttribute("max", event.detail.value.toString());
});

window.addEventListener("transitionIndexChanged", function (event: CustomEventInit<{ value: number }>) {
    (document.querySelector("#frames-slider") as HTMLSelectElement).value = event.detail.value.toString();
});

function main() {
    document.querySelector("#button-start").addEventListener("click", onStartVisualizationButtonClick);

    document.querySelector("#frames-button--prev").addEventListener("click", movePrev);
    document.querySelector("#frames-button--next").addEventListener("click", moveNext);
}

function onStartVisualizationButtonClick() {
    const string = (document.querySelector("#input-string") as HTMLInputElement).value;

    restart(string);
}
