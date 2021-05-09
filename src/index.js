let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToy;
});

function getToy(){
  let formData ={
    name: name,
    image: image,
    likes: likes
  };
  let configObj ={
    method: "POST",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(arrToys => { 
      const locToylist= document.getElementById("toy-collection");
      for(let i=0; i<arrToys.length; i++){
        const toy=document.createElement("div");
        toy.className="card"
        for (const key in arrToys[i]){
          if (key =="name"){
            let toyName=document.createElement("h2");
            toyName.innerText= arrToys[i].name;
            toy.append(toyName);
          }
          else if (key == "image"){
            let img =document.createElement("img");
            img.className="toy-avatar"
            img.src=arrToys[i].image;
            toy.append(img);
          }
          else if (key=="likes"){
            let toylikes=document.createElement("p");
            toylikes.innerText= arrToys[i].likes;
            toy.append(toylikes);
          }
        }
        let like_botton=document.createElement("button");
        like_botton.className="like-btn";
        toy.append(like_botton);
        locToylist.append(toy);
      }
    });
}
