const nstElements = [
  "nst-upload-div",
  "content-upload",
  "file-info-1",
  "contentImage",
  "style-upload",
  "file-info-2",
  "styleImage",
  "style",
  ".images-div",
  "upload-title",
  ".uploaded-images",
  ".image-div",
  ".result",
  "img-placeholder-style",
  "img-placeholder-content",
  "stylized-title",
  "img-style",
];

const saElements = [
  "imageForm",
  "att-upload-div",

  "image1-btn",
  "image1",
  "button-2",
  "image2-btn",
  "image2",
  "compare",
  "upload-title",
];

document.getElementById("sa-button").onclick = function () {
  nstElements.forEach((id) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });

  saElements.forEach((id) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "flex";
    }
  });
};

document.getElementById("nst-button").onclick = function () {
  saElements.forEach((id) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
    nstElements.forEach((id) => {
      let element = document.getElementById(id);
      if (element) {
        element.style.display = "";
      }
    });
  });
};

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
