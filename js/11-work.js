// Importing required variables from another file
import { mapClasses , previews } from "./12-data.js";

// When the DOM content is loaded, execute the following code
document.addEventListener("DOMContentLoaded" , function () {
    // Selecting required elements from the DOM
    const con = document.querySelector(".con");
    const previewBg = document.querySelector(".preview-bg");
    const shoes = document.querySelectorAll(".shoe");
    let activePreview = document.querySelector(".preview.default");

    let isMouseOverItem = false;

    // Default clip paths for different variants
    const defaultClipPaths = {
        "variant-1": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        "variant-2": "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        "variant-3": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    };

    // Transformations for different variants
    const variantTransform = {
        "variant-1": {
            title: {x: 75, opacity: 0},
            tags: {y: -75, opacity: 0},
            description: {x: -75, opacity: 0}
        },
        "variant-2": {
            title: {x: -75, opacity: 0},
            tags: {y: -75, opacity: 0},
            description: {x: 75, opacity: 0}
        },
        "variant-3   ": { // There seems to be extra spaces in the key, should be "variant-3"
            title: {x: 75, opacity: 0},
            tags: {y: 75, opacity: 0},
            description: {x: 75, opacity: 0}
        },
    };

    // Function to get default clip path based on the variant
    function getDefaultClipPath(previewElement){
        for (const variant in defaultClipPaths) {
            if(previewElement.classList.contains(variant)) {
                return defaultClipPaths[variant];
            }
        }
        return "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)";
    }

    // Function to apply variant-specific styles to preview elements
    function applyVariantStyle(previewElement) {
        console.log(previewElement);
        const variant = previewElement.className
        .split(" ")
        .find((className) => className.startsWith("variant-"));
        if (variant && variantTransform[variant]) {
            Object.entries(variantTransform[variant]).forEach(
                ([elementClass , transform]) => {
                    const element = previewElement.querySelector(
                        `.preview-${elementClass}`
                    );
                    if (element) {
                        gsap.set(element, transform);
                    }
                }
            );
        }
    }

    // Function to change background image
    function changeBg(newImgSrc) {
        console.log(newImgSrc);
        const newImg = document.createElement("img");
        newImg.src = newImgSrc;
        newImg.style.position = "absolute";
        newImg.style.top = "0";
        newImg.style.left = "0";
        newImg.style.width = "100%";
        newImg.style.height = "100%";
        newImg.style.objectFit = "cover";
        newImg.style.opacity = "0";

        previewBg.appendChild(newImg);

        gsap.to(newImg, {opacity: 1, duration: 0.5});

        if(previewBg.children.length > 1){
            const oldImg = previewBg.children[0];
            gsap.to(oldImg, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    previewBg.removeChild(oldImg);
                }
            });
        }
    }

    // Creating preview elements based on the data
    previews.forEach((preview, index) => {
        const previewElement = document.createElement("div");
        previewElement.className = `preview ${mapClasses[index]} preview-${
            index + 1
        }`;
        previewElement.innerHTML = `
        <div class="preview-img"><img src="${preview.img}"/></div>
        <div class="preview-title"><h1><b><font color="#0000
        00">${preview.title}</b></h1></div>
        <div class="preview-tags"><h1></h1></div>
        <div class="preview-description"><h1>${preview.description}</h1></div>
        `;
        con.appendChild(previewElement);
        applyVariantStyle(previewElement);
    });

    // Adding event listeners to each shoe element
    shoes.forEach((shoe, index) => {
        // Event listener for mouse entering the shoe element
        shoe.addEventListener("mouseenter", () => {
            isMouseOverItem = true;
            const newBg = `pic/bg/bg-${index + 1}.jpeg`;
            changeBg(newBg);

            const newActivePreview = document.querySelector(`.preview-${index + 1}`);
            if (activePreview && activePreview !== newActivePreview) {
                const previousActivePreviewImg = 
                    activePreview.querySelector(".preview-img");
                const previousDefualtClipPath = getDefaultClipPath(activePreview);
                gsap.to(previousActivePreviewImg , {
                    clipPath: previousDefualtClipPath,
                    duration: 0.75,
                    ease: "power3.out",
                });

                gsap.to(activePreview, {
                    opacity: 0,
                    duration: 0.3,
                    delay: 0.2,
                });

                applyVariantStyle(activePreview, true);
            }

            gsap.to(newActivePreview, {opacity: 1, duration:0.1});
            activePreview = newActivePreview;

            const elementToAnimate = ["title" , "tags" , "description"];
            elementToAnimate.forEach((el) =>{
                const element = newActivePreview.querySelector(`.preview-${el}`);
                if (element) {
                    gsap.to(element, {x: 0, y:0, opacity: 1, duration:0.5 });
                }
            });

            const activePreviewImg = activePreview.querySelector(".preview-img");
            gsap.to(activePreviewImg , {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "power3.out",
            });
        });

        // Event listener for mouse leaving the shoe element
        shoe.addEventListener("mouseleave" , () => {
            isMouseOverItem = false;
            applyVariantStyle(activePreview , true);

            setTimeout(() => {
                if(!isMouseOverItem) {
                    changeBg("pic/defualt-bg.jpeg");
                    if(activePreview) {
                        gsap.to(activePreview, {opacity:0, duration:0.1});
                        const defaultPreview = document.querySelector("preview.default");
                        gsap.to(defaultPreview, {opacity: 1, duration:0.1});
                        activePreview = defaultPreview;

                        const activePreviewImg = 
                        activePreview.querySelector(".preview-img");
                        gsap.to(activePreviewImg, {
                            clipPath:defaultClipPath,
                            duration: 1,
                            ease: "power3.out",
                        });
                    }
                }
            }, 10);
        })
    });
});



// Animating the main heading element
gsap.from("#main-heading", {
    opacity: 0,             // Starting opacity
    fontSize: "2rem",       // Starting font size
    duration: 1,            // Animation duration in seconds
    ease: "back.out(1.7)"   // Easing function
  });
  
  // Animating the "New" label element
  gsap.from("#new-label", {
    opacity: 0,             // Starting opacity
    x: -50,                 // Starting position along the X-axis
    duration: 1,            // Animation duration in seconds
    delay: 0.5              // Delay before the animation starts in seconds
  });
  
  // Animating the "Featured" label element
  gsap.from("#featured-label", {
    opacity: 0,             // Starting opacity
    x: 50,                  // Starting position along the X-axis
    duration: 1,            // Animation duration in seconds
    delay: 0.5              // Delay before the animation starts in seconds
  });
  
  // Animating all elements with class "shoe"
  gsap.from(".shoe", {
    opacity: 0,             // Starting opacity
    y: 50,                  // Starting position along the Y-axis 
    duration: 1,            // Animation duration in seconds
    stagger: 0.5            // Stagger animation for each element in seconds
  });
  
  // Selecting all elements with class "add-to-cart" and adding event listeners
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartLink = document.querySelector('.cart');
  
  let cartItemsCount = 0; // Initializing cart items count
  
  // Adding click event listeners to each "add to cart" button
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartItemsCount++;   // Incrementing cart items count
        updateCartCount();  // Updating cart count displayed in the cart link
    });
  });
  
  // Function to update the cart count displayed in the cart link
  function updateCartCount() {
    cartLink.textContent = `Cart (${cartItemsCount})`; // Updating cart link text content
  }

