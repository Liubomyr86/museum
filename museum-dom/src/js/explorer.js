const slider = document.querySelector(".explorer__slider");
const sliderImgWrapper = document.querySelector(".explorer__img-overlay");
const sliderHandle = document.querySelector(".explorer__handle");
let isSliderLocked = false;

export function sliderMouseMove(event) {

  if(isSliderLocked) return;

  const sliderLeftX = slider.offsetLeft;
  const sliderWidth = slider.clientWidth;
  const sliderHandleWidth = sliderHandle.clientWidth;

  let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
  if(mouseX < 0) mouseX = 0;
  else if(mouseX > sliderWidth) mouseX = sliderWidth;

  sliderImgWrapper.style.width = `${((1 - mouseX/sliderWidth) * 100).toFixed(4)}%`;
  sliderHandle.style.left = `calc(${((mouseX/sliderWidth) * 100).toFixed(4)}% - ${sliderHandleWidth/2}px)`;
}

export function sliderMouseDown() {
  if(isSliderLocked) isSliderLocked = false;
  slider.addEventListener("mousemove", sliderMouseMove);
  slider.addEventListener("touchmove", sliderMouseMove);
}

export function sliderMouseUp() {
  if(!isSliderLocked) isSliderLocked = true;
}

sliderHandle.addEventListener("mousedown", sliderMouseDown);
sliderHandle.addEventListener("touchstart", sliderMouseDown);
window.addEventListener("mouseup", sliderMouseUp);
window.addEventListener("touchend", sliderMouseUp);






















//
