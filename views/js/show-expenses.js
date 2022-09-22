const baseURL = "http://localhost:3000";

const ul = document.querySelector("#users");
const btn = document.querySelector("#show-users");
amtInp = document.getElementById('amountInp')
descInp = document.getElementById('descInp')
catInp = document.getElementById('catInp')
sbmtbtn = document.getElementById('submit')

let deleteuser = async (e) => {
  e.preventDefault();
  let editli = e.target.parentNode;
  await axios.delete(baseURL + "/expense/" + editli.id);
  e.target.parentNode.remove();
};

function edituser(e) {
  e.target.parentNode.remove();
  deleteuser(e)
  window.location.replace("http://127.0.0.1:5500/views/index.html");
}

let showUsers = async (e) => {
  //display
  console.log("Show Users!");
  let result = await axios.get(baseURL + "/show-expenses");
  let userList = result.data;
  console.log(userList);
  for (let i = 0; i < userList.length; i++) {
    let editbtn = createEditButton();
    let deletebtn = creatDeleteButton();

    //Adding Appointments List
    let li = document.createElement("li");
    li.id = userList[i].id;
    let userJson = userList[i];
    console.log(userJson);
    let userp = document.createElement("h2");
    userp.className = "user";
    userp.textContent = userJson.amount;
    let emailp = document.createElement("h3");
    emailp.textContent = userJson.description;
    emailp.className = "email";
    let phonep = document.createElement("h3");
    phonep.className = "phone";
    phonep.textContent = userJson.category;
    li.appendChild(userp);
    li.appendChild(emailp);
    li.appendChild(phonep);
    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    ul.appendChild(li);
  }
  e.target.remove();
};

btn.addEventListener("click", showUsers);

function creatDeleteButton() {
  let deletebtn = document.createElement("button");
  deletebtn.className = "delete";
  deletebtn.textContent = "Delete";
  deletebtn.style.backgroundColor = "red";
  deletebtn.style.display = "inline";
  deletebtn.style.padding = "3px";
  deletebtn.style.borderWidth = "3px";
  deletebtn.addEventListener("click", deleteuser);
  return deletebtn;
}

function createEditButton() {
  let editbtn = document.createElement("button");
  editbtn.className = "edit";
  editbtn.textContent = "Edit";
  editbtn.style.backgroundColor = "cyan";
  editbtn.style.display = "inline";
  editbtn.style.padding = "3px";
  editbtn.style.borderWidth = "3px";
  editbtn.style.marginRight = "4px";
  editbtn.addEventListener("click",edituser);
  return editbtn;
}
