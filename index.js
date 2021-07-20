const addForm = document.querySelector("form");
const nameInput = document.querySelector("input");
const container = document.querySelector("section");

function submitHandler(e) {
    e.preventDefault();
    axios
        .post("/api/hero", { name: nameInput.value })
        .then((res) => {
        container.innerHTML = "";

        res.data.forEach((heroName) => {
            container.innerHTML += `<p>${heroName}</p>`;
        });
    })
    .catch((err) => console.log(err));
}

addForm.addEventListener("submit", submitHandler);