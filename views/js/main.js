const baseURL = 'http://localhost:3000';

const form = document.getElementById('form-control')
const amount = document.getElementById('amount')
const description = document.getElementById('desc')
const category = document.getElementById('category')
const submit = document.getElementById('submitbtn')
submit.addEventListener('click', onSubmit)

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get(baseURL + '/show-expenses')
        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            appendList(response.data[i])
        }
    } catch (error) {
        console.log(error)
    }
})


async function onSubmit(event) {
    event.preventDefault()
    try {
        if (!(amount.value == '' || description.value == '' || category.value == '')) {
            myObj = {
                amount: amount.value,
                description: description.value,
                category: category.value
            }
            console.log(myObj)
            
            amount.value = ''
            description.value = ''
            category.value = ''


            const response = await axios.get(baseURL + '/show-expenses');
            for (let i = 0; i < response.data.length; i++) {
                if (myObj.description === response.data[i].description) {
                    let id = response.data[i].id
                    await axios.delete(baseURL + `/expense/${id}`)
                }
            }
            await axios.post(baseURL + '/add-expense', myObj)
            // window.location.replace("http://127.0.0.1:5500/views/show-expenses.html");
            appendList(myObj)

        } else {
            alert('Enter all values!')
        }
    } catch (error) {
        console.log(error)
        // window.location.replace("http://127.0.0.1:5500/views/404.html");
    }
}

//Main Function:
function appendList(myObj) {

    const allh4inFront = document.getElementsByClassName('desc-h4-class')
    for (let i = 0; i < allh4inFront.length; i++) {
        if (allh4inFront[i].innerHTML === myObj.description) {
            const toBeDeleted = allh4inFront[i].parentElement
            toBeDeleted.remove()
        }
    }

    const innerDiv = document.createElement('div')
    innerDiv.classList.add('inner-div', "card-body", "subheader", "bg-light")
    const amtContainerH4 = document.createElement('h4')
    amtContainerH4.classList.add('amt-h4-class')
    const descContainerH4 = document.createElement('h4')
    const catContainerH4 = document.createElement('h4')
    catContainerH4.classList.add('cat-h4-class')
    descContainerH4.classList.add('desc-h4-class')

    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    editButton.classList.add('innerbtn', 'editbtn', 'btn', 'btn-outline-success')
    deleteButton.classList.add('innerbtn', 'dltbtn', 'btn', 'btn-outline-danger')

    editButton.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'
    amtContainerH4.innerHTML = myObj.amount
    descContainerH4.innerHTML = myObj.description
    catContainerH4.innerHTML = myObj.category

    innerDiv.appendChild(amtContainerH4)
    innerDiv.appendChild(descContainerH4)
    innerDiv.appendChild(catContainerH4)
    innerDiv.appendChild(editButton)
    innerDiv.appendChild(deleteButton)

    const parentDiv = document.getElementById('total-items')
    parentDiv.appendChild(innerDiv)
    //---------------------------------------------------------------------------------
    deleteButton.addEventListener('click', deleteDivAndData)
    editButton.addEventListener('click', editFrontData)

    //Edit Button Function:
    function editFrontData() {
        const targetamt = editButton.previousSibling.previousSibling.previousSibling.innerHTML
        const targetdesc = editButton.previousSibling.previousSibling.innerHTML
        const targetCategory = editButton.previousSibling.innerHTML

        amount.value = targetamt;
        description.value = targetdesc;
        category.value = targetCategory

        deleteDivAndData()

        let updatedObj = {
            amount: amount.value,
            description: description.value,
            category: category.value
        }

        // console.log(updatedObj)
        appendList(updatedObj)
    }


    async function deleteDivAndData() {
        try {
          const descforRemovingFromLocal =
            deleteButton.previousSibling.previousSibling.previousSibling.innerHTML;
          const response = await axios.get(baseURL + "/show-expenses");
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].description === descforRemovingFromLocal) {
              let uId = response.data[i].id;
              await axios.delete(baseURL + `/expense/${uId}`);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
}
