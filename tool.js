let optionCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let optionFlag = true;

let pencilCont = document.querySelector(".pencil-tool-cont");
let eraserCont = document.querySelector(".eraser-tool-cont");
let pecncilClick = document.querySelector(".pencil");
let eraserClick = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;

let stickyClick = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

optionCont.addEventListener("click", (e) => {
  optionFlag = !optionFlag;
  if (optionFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "flex";
}

function closeTools() {
  let iconElem = optionCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "none";

  pencilCont.style.display = "none";
  eraserCont.style.display = "none";
}

pecncilClick.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;

  if (pencilFlag) pencilCont.style.display = "block";
  else pencilCont.style.display = "none";
});

eraserClick.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (pencilFlag) eraserCont.style.display = "flex";
  else eraserCont.style.display = "none";
});

stickyClick.addEventListener("click", (e) => {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = `
    <div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
      </div>
      <div class="note-cont">
        <textarea ></textarea>
      </div>
    `;

  document.body.appendChild(stickyCont);

  let remove = document.querySelector(".remove");
  let minimize = document.querySelector(".minimize");
  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragAnddrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
});

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}

upload.addEventListener("click", (e) => {
  //this will open the file explorer
  let input = document.createElement("input") ; 
  input.setAttribute("type", "file") ; 
  input.click(); 

  //this will put the selected img in the first place of the array
  input.addEventListener("change", (e)=> {
    let file = input.files[0] ; 
    let url = URL.createObjectURL(file); 

    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = `
      <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
        <img src="${url}" />
        </div>
      `;
      
    document.body.appendChild(stickyCont);
  
    let remove = document.querySelector(".remove");
    let minimize = document.querySelector(".minimize");
    noteActions(minimize, remove, stickyCont);
  
    stickyCont.onmousedown = function (event) {
      dragAnddrop(stickyCont, event);
    };
  
    stickyCont.ondragstart = function () {
      return false;
    };

  })
    
});

function dragAnddrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
