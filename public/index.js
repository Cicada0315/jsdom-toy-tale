let addToy = false;
const locToylist= document.getElementById("toy-collection");
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.children[0].addEventListener('submit', event => {
        event.preventDefault();
        let values = document.getElementsByClassName("input-text")
        addToytoList(values.name.value, values.image.value);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToy();
});

function getToy(){
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(arrToys => {arrToys.forEach(toyinfo => toy(toyinfo))
    });      
}

function toy(toyObj){
  const toy=document.createElement("div");
  toy.className="card"
 
  let toyName=document.createElement("h2");
  toyName.innerText= toyObj.name;
  toy.append(toyName);

  let img =document.createElement("img");
  img.className="toy-avatar"
  img.src=toyObj.image;
  toy.append(img);

  let toylikes=document.createElement("p");
  toylikes.innerText= toyObj.likes;
  toy.append(toylikes);
   
  let like_botton=document.createElement("button");
  like_botton.className="like-btn";
  like_botton.id = toyObj.id;
  like_botton.innerText="likes"
  toy.append(like_botton);
  locToylist.append(toy);
  like_botton.addEventListener("click", (event) => {
    incrementlike(event);
  })  

}

function addToytoList(newname, newimage) {
  return fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      name: newname, 
      image: newimage, 
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(newtoy => toy(newtoy))
}

function incrementlike(e){
  e.preventDefault();
  let target_id=e.target.id
  let incremented = parseInt(e.target.previousElementSibling.innerText) + 1;
  fetch(`http://localhost:3000/toys/${target_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": incremented
    })
  })
  .then(resp => resp.json())
  .then(likeObj => {
    e.target.previousElementSibling.innerText = incremented;
  });
}