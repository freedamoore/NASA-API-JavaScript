const sevenDaysAgo = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24 * 10);
const year = sevenDaysAgo.getFullYear();
const month = sevenDaysAgo.getMonth() + 1;
const day = sevenDaysAgo.getDate();
const startDate = `${year}-${month}-${day}`;
const apiKey = "eTA0IfKg7oy8Cx41GHeAsA1fc6ep4t2nkyMBgisM";
const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&api_key=${apiKey}`;

// HTTP request
const Http = new XMLHttpRequest();
Http.open("GET", url);
Http.send();

Http.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const dataArray = JSON.parse(Http.responseText);
    // console.log(dataArray);
    //iterate through json items and populate images on page
    let i;
    const length = 10; // we only want 10 images
    for (i = 0; i < length; i++) {

      if (dataArray[i]['media_type'] === "video") {
        document.getElementById(`img--${i+1}`).src = "video-img.png";
      } else {
        document.getElementById(`img--${i+1}`).src = dataArray[i].url;
      }
    }

    //display popup elements
    const images = document.getElementsByClassName('popup-link');
    const popImg = document.getElementById('pop-img');
    const popVid = document.getElementById('pop-vid');
    const imgCopyright = document.getElementById('img-copyright');
    const title = document.getElementById('title');
    const date = document.getElementById('date');
    const explanation = document.getElementById('explanation');

    for (let i = 0; i < length; i++) {
      images[i].addEventListener("click", function() {
        //images are displayed in reverse date order, so need to make up for this
        let x = length-i-1;
        if (dataArray[x]['media_type'] === "video") {
          popImg.style.display = "none";
          popVid.style.display = "block";
          popVid.src = dataArray[x].url;
        } else {
          popImg.style.display = "block";
          popVid.style.display = "none";
          popImg.src = dataArray[x].url;
        }
        imgCopyright.textContent = "Image Credit & Copyright: " + dataArray[x].copyright;
        title.textContent = dataArray[x].title;
        date.textContent = dataArray[x].date;
        explanation.textContent = dataArray[x].explanation;
      })
    }
  }
}
