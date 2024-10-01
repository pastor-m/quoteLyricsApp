import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

export default function generateImage(elementId){
    var node = document.getElementById(elementId);
    console.log('este es el nodo',node)
    htmlToImage.toPng(node)
        .then(function(dataUrl){
        
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
            
            // download(dataUrl,'quote.png')
        })

        .catch(function(error){
            console.error("error while getting image", error)
        })
}

