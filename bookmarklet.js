(function(){

// Retrieve all highlights in the text

  let highlightsList = document.getElementsByClassName('highlight');

  let annotationIDList = [];
  let clipsTextList = [];

  for(i = 0; i < highlightsList.length; i++){
    let annotationID = highlightsList[i].attributes['annotation_id'].nodeValue;
    let clipText = highlightsList[i].lastChild.nodeValue.replace(/^\s+|\s+$/g, "");

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

  for(i = 0; i < clipsTextList.length; i++){
    clipsTextList[i] = clipsTextList[i].replace(/^\s+|\s+$/g, "");
  }
  let clips = clipsTextList.join("\n \t");

  let content = `[${title}](${originalURL}) - [[Pocket2Roam]]
    Written by:: ${author}
    Pocket URL : ${location.href}
    Summary::
    [[Quotes]]
      ${clips}`

  const tempTA = document.createElement("textarea");
  document.body.appendChild(tempTA);
  tempTA.value = content;
  tempTA.select();
  document.execCommand("copy");

  alert("Highlights and metadata have been copied to the clipboard");

})()
