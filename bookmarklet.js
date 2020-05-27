(function(){

// Retrieve all highlights in the text

  let highlightsList = document.getElementsByClassName('highlight');

  let annotationIDList = [];
  let clipsTextList = [];

  for(i = 0; i < highlightsList.length; i++){
    let annotationID = highlightsList[i].attributes['annotation_id'].nodeValue;
    let clipText = highlightsList[i].lastChild.nodeValue;

    if(!annotationIDList.includes(annotationID)){
        annotationIDList.push(annotationID);
        clipsTextList.push(clipText);
    } else {
        let index = annotationIDList.lastIndexOf(annotationID);
        clipsTextList[index] = clipsTextList[index].concat(clipText).split("\n").join(" ");
    }
  }

  // Retrieve article metadata : Title, Original URL, Author

  let title = document.title.replace("Pocket - ", "");

  let originalURL = document.querySelector('header').getElementsByClassName('css-1890bmp')[0].lastChild.href.match("(?!^(.+)(url=))(http)(.+)(%3A%2F%2F)(.+)$")[0];
  originalURL = originalURL.replace("%3A", ":");
  originalURL = originalURL.split("%2F").join("/");

  let author = document.getElementsByClassName('css-acjdas')[0].lastChild.nodeValue;

  // Custom Formatting Output

  let clips = clipsTextList.join("\n \t \t");

  let text = "["+title+"]("+originalURL+") [[Pocket2Roam]]" + "\n \t " + "Written by:: " + author + "\n \t " + "Pocket URL : " +location.href+ "\n \t " + "Summary::" + "\n \t " + "[[Quotes]]" + "\n \t \t " + clips;

  prompt("Press CTRL+C or CMD+C, then paste into Roam", text);

})()
