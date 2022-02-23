const paragraphs = document.getElementsByTagName("p");


if(paragraphs.length > 0){

    const p1 = paragraphs[0];
    p1.innerText = "Bienvenidos al Bootcamp!";

}

if(paragraphs.length > 1){

    const p1 = paragraphs[1];
    const fecha = new Date();
    p1.innerText = "Párrafos en el documento " + paragraphs.length + " (" + fecha + ")";

}