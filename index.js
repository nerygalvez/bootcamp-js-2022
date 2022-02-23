const paragraph = document.getElementsByTagName("p");
console.log("Párrafos en el documento ", paragraph.length);

if(paragraph.length > 0){

    const p1 = paragraph[0];

    p1.innerText = "Bienvenidos al Bootcamp!";

}
