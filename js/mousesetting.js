// Selecting the DOM elements with the specified attributes
const mouseDot = document.querySelector("[data-mouse-dot]"); // Dot element that follows mouse cursor
const mouseOutLine = document.querySelector("[data-mouse-outline]"); // Outline element that follows mouse cursor

// Adding a mousemove event listener to the window
window.addEventListener("mousemove", function(e) {
    // Retrieving the X and Y coordinates of the mouse pointer
    const posX = e.clientX; // X coordinate of the mouse pointer
    const posY = e.clientY; // Y coordinate of the mouse pointer

    // Setting the position of the dot element to match the mouse pointer
    mouseDot.style.left = `${posX}px`; // Setting the left position of the dot element
    mouseDot.style.top = `${posY}px`; // Setting the top position of the dot element

    // Animating the outline element to follow the mouse pointer
    mouseOutLine.animate(
        {
            left: `${posX}px`, // Target left position of the outline element
            top: `${posY}px`   // Target top position of the outline element
        }, 
        { 
            duration: 500,     // Animation duration in milliseconds
            fill: "forwards"   // Specifies that the animation state persists after the animation completes
        }
    );
});
