document.getElementById("image1").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const img = document.getElementById("img-placeholder-1");
  const loaderDiv = document.getElementById("loader-placeholder-1");
  const loader = document.getElementById("loader-1");

  reader.onload = function (e) {
    loaderDiv.style.display = "flex";
    loader.style.display = "block";
    setTimeout(function () {
      loaderDiv.style.display = "none";
      loader.style.display = "none";
      document.getElementById("originalImage1").src = e.target.result;
    }, 3000);
    img.style.display = "none";
  };
  reader.readAsDataURL(file);
});

document.getElementById("image2").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const img = document.getElementById("img-placeholder-2");
  const loaderDiv = document.getElementById("loader-placeholder-2");
  const loader = document.getElementById("loader-2");

  reader.onload = function (e) {
    loaderDiv.style.display = "flex";
    loader.style.display = "block";
    setTimeout(function () {
      loaderDiv.style.display = "none";
      loader.style.display = "none";
      document.getElementById("originalImage2").src = e.target.result;
    }, 3000);
    img.style.display = "none";
  };
  reader.readAsDataURL(file);
});

document
  .getElementById("imageForm")
  .addEventListener("submit", async function (event) {
    const img = document.getElementById("img-placeholder-3");
    const loaderDiv = document.getElementById("loader-placeholder-3");
    const loader = document.getElementById("loader-3");

    const img2 = document.getElementById("img-placeholder-4");
    const loaderDiv2 = document.getElementById("loader-placeholder-4");
    const loader2 = document.getElementById("loader-4");

    img.style.display = "none";
    loaderDiv.style.display = "flex";
    loader.style.display = "block";

    img2.style.display = "none";
    loaderDiv2.style.display = "flex";
    loader2.style.display = "block";

    event.preventDefault();

    const image1 = document.getElementById("image1").files[0];
    const image2 = document.getElementById("image2").files[0];

    if (!image1 || !image2) {
      alert("Please select both images to compare their styles.");
      return;
    }

    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await fetch("{END_POINT}/attribution", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        loaderDiv.style.display = "none";
        loader.style.display = "none";
        loaderDiv2.style.display = "none";
        loader2.style.display = "none";

        const data = await response.json();
        document.getElementById("styleImage1").src =
          "data:image/png;base64," + data.image1_features;
        document.getElementById("styleImage2").src =
          "data:image/png;base64," + data.image2_features;
        document.getElementById(
          "styleSimilarity"
        ).textContent = `Style Similarity: ${data.style_similarity.toFixed(
          2
        )}%`;
      } else {
        const error = await response.json();
        alert("Failed to compare images: " + error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the images");
    }
  });
