import "./styles.css";

document
  .getElementById("style-attribution-button")
  .addEventListener("click", function () {
    const elementsToToggle = [
      ".target",
      ".att-upload-div",
      ".style-result",
      ".style-image-div",
      ".style-compare-button",
      ".style-button-div",
      ".style-custom-file-upload",
      ".att-button-div",
      ".stylize-button",
      ".upload-div",
      ".custom-file-upload",
      ".images-div",
      "#img-placeholder-style",
      "#stylized-title",
      "#img-style",
    ];

    elementsToToggle.forEach((selector) => {
      toggle(document.querySelectorAll(selector));
    });
  });

function toggle(elements, specifiedDisplay) {
  var element, index;

  elements = elements.length ? elements : [elements];
  for (index = 0; index < elements.length; index++) {
    element = elements[index];

    if (isElementHidden(element)) {
      element.style.display = "";

      // If the element is still hidden after removing the inline display
      if (isElementHidden(element)) {
        element.style.display = specifiedDisplay || "block";
      }
    } else {
      element.style.display = "none";
    }
  }
  function isElementHidden(element) {
    return (
      window.getComputedStyle(element, null).getPropertyValue("display") ===
      "none"
    );
  }
}

document
  .getElementById("contentImage")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const img = document.getElementById("img-placeholder-content");
    const loaderDiv = document.getElementById("loader-placeholder-content");
    const loader = document.getElementById("content-loader");

    reader.onload = function (e) {
      loaderDiv.style.display = "flex";
      loader.style.display = "block";
      setTimeout(function () {
        loaderDiv.style.display = "none";
        loader.style.display = "none";
        document.getElementById("uploadedContentImage").src = e.target.result;
      }, 3000);

      img.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

document
  .getElementById("styleImage")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const img = document.getElementById("img-placeholder-style");
    const loaderDiv = document.getElementById("loader-placeholder-style");
    const loader = document.getElementById("style-loader");

    reader.onload = function (e) {
      loaderDiv.style.display = "flex";
      loader.style.display = "block";
      setTimeout(function () {
        loaderDiv.style.display = "none";
        loader.style.display = "none";
        document.getElementById("uploadedStyleImage").src = e.target.result;
      }, 3000);

      img.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

document.getElementById("style").addEventListener("click", (e) => {
  const img = document.getElementById("img-style");
  const loaderDiv = document.getElementById("loader-placeholder-result");
  const loader = document.getElementById("style-loader-3");
  img.style.display = "none";
  loaderDiv.style.display = "flex";
  loader.style.display = "block";

  document
    .getElementById("imageForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const contentImage = document.getElementById("contentImage").files[0];
      const styleImage = document.getElementById("styleImage").files[0];

      if (!contentImage || !styleImage) {
        alert("Please select both images");
        return;
      }

      const formData = new FormData();
      formData.append("content_image", contentImage);
      formData.append("style_image", styleImage);

      try {
        const response = await fetch("{END_POINT}/stylize", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          document.getElementById("img-style").style.display = "none";
          document.getElementById("stylizedImage").src = url;
          loaderDiv.style.display = "none";
          loader.style.display = "none";
        } else {
          alert("Failed to stylize image");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing the images");
      }
    });
});

// function loaderTimeOut() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Other things to do before completion of the promise
//       loaderDiv.style.display = "none";
//       loader.style.display = "none";
//       // The fulfillment value of the promise
//       console.log("loader worked");
//     }, 2000);
//   });
// }

// setTimeout(function () {
//   loaderDiv.style.display = "none";
//   loader.style.display = "none";
// }, 3000);
