let qNumber = 2;
let quizData = {
    questions: []
}

let addQuestion = document.getElementById("add-question")

// console.log(addQuestion);

addQuestion.addEventListener("click", (donot) => {

    donot.preventDefault();

    const mainContainer = document.getElementsByClassName("main-container")[0]

    const addBtn = document.getElementById("add-btn")

    const nextContainer = document.createElement("div")

    nextContainer.classList.add("container")

    nextContainer.innerHTML = `
<h3>QUESTION ${qNumber}</h3>

<div>
    <label for="question">Type Question :</label>
    <input class="question" type="text">
</div>

<div class="options">
    <div class="sub-option">
        <div class="sub-sub-option">
            <label for="optionA-${qNumber}">Option-A :</label>
            <input class="op-input inputA" id="optionA-${qNumber}"  type="text">
        </div>
        <div class="sub-sub-option">
            <label for="optionB-${qNumber}">Option-B :</label>
            <input class="op-input inputB" id="optionB-${qNumber}" type="text">
        </div>
    </div>
    <div class="sub-option">
        <div class="sub-sub-option">
            <label for="optionC-${qNumber}">Option-C :</label>
            <input class="op-input" id="optionC-${qNumber}" type="text">
        </div>
        <div class="sub-sub-option">
            <label for="optionD-${qNumber}">Option-D :</label>
            <input class="op-input" id="optionD-${qNumber}" type="text">
        </div>
    </div>
</div>

<div class="answer">
    <label>Select Correct Answer :</label>
    <div class="sub-answer">
        <input type="radio" id="rA-${qNumber}" value="A" name="${qNumber}">
        <label for="rA-${qNumber}">A</label>

        <input type="radio" id="rB-${qNumber}" value="B" name="${qNumber}">
        <label for="rB-${qNumber}">B</label>

        <input type="radio" id="rC-${qNumber}" value="C" name="${qNumber}">
        <label for="rC-${qNumber}">C</label>

        <input type="radio" id="rD-${qNumber}" value="D" name="${qNumber}">
        <label for="rD-${qNumber}">D</label>
    </div>
</div>
`
    qNumber++;
    mainContainer.insertBefore(nextContainer, addBtn)
})

let hstBtn = document.getElementById("hst-btn")

hstBtn.addEventListener("click", async () => {

    const findCheckedRadio = (subAnsDiv) => {

        for (let i = 0; i < 7; i = i + 2) {
            if (subAnsDiv.children[i].checked) {
                return subAnsDiv.children[i].value;
            }
        }

        return '0';
    }

    let mainContainer = document.getElementById("main-container")

    for (let i = 0; i < qNumber - 1; i++) {
        let qdata = {
            question: mainContainer.children[i].children[1].children[1].value,
            optionA: document.getElementsByClassName("inputA")[i].value,
            optionB: document.getElementsByClassName("inputB")[i].value,
            optionC: mainContainer.children[i].children[2].children[1].children[0].children[1].value,
            optionD: mainContainer.children[i].children[2].children[1].children[1].children[1].value,
            answer: findCheckedRadio(document.getElementsByClassName('sub-answer')[i])
        }
        quizData.questions.push(qdata)
    }

    try {
        let response = await fetch('https://testing-seven-jade.vercel.app/r', {
            method: "POST",
            body: JSON.stringify(quizData),
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "application/json",
            }
        })
        // console.log(response);
        const responseObj = await response.json()
        console.log(responseObj)

        let yourCode = `Your Quiz Code is : ${responseObj.quizCode} - Please note this code and give it to your participants to give a quiz`

        alert(yourCode)
        window.location.reload();

    } catch (error) {
        console.log(error);
    }

})











