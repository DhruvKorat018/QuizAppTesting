let number = 1;

let quizStartCode

let queLength;

var radioListNum = 10;

var ans;

let  answers = [] 

let insCodeContainer = document.getElementById('main-code-container')

let qStartBtn = document.getElementById("quizStartBtn")

qStartBtn.addEventListener("click", async (dont) => {

    quizStartCode = document.children[0].children[1].children[0].children[0].children[1].value

    dont.preventDefault();

    try {
        let response = await fetch(`https://testing-seven-jade.vercel.app/getquizdata/${quizStartCode}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "application/json",
            }

        })

        let resObj = await response.json()

        // console.log(resObj);

        let dataArray = new Array()

        // console.log(dataArray);

        for (let j = 0; j < resObj.questions.length; j++) {

            que = {

                saval: resObj.questions[j].question,
                oA: resObj.questions[j].optionA,
                oB: resObj.questions[j].optionB,
                oC: resObj.questions[j].optionC,
                oD: resObj.questions[j].optionD
            }

            dataArray.push(que)

        }

        // console.log(dataArray);

        if (resObj.error) {
            alert("Some arror occures")
        } else {
            alert("Your quiz has been started - Press ok to Continue ")
            for (let i = 0; i < resObj.questions.length; i++) {

                // addIn is main-start-container

                const addIn = document.children[0].children[1].children[1]
                const adabfr = document.getElementById("addbfr")
                const add = document.createElement("div")

                add.classList.add("sub-start-container")

                add.innerHTML = `<div class="queNumer">
                <h3>Question ${number}</h3>
                </div>
                
                <div class="que">
                ${dataArray[i].saval}
                </div>
                
                <div class="opt-radio" id = "radio">
                
                <input type="radio" id="rA-${number}" value="A" name="ans-${number}">
                <label for="rA-${number}">${dataArray[i].oA}</label>
                <br>
                <input type="radio" id="rB-${number}" value="B" name="ans-${number}">
                <label for="rB-${number}">${dataArray[i].oB}</label>
                <br>
                <input type="radio" id="rC-${number}" value="C" name="ans-${number}">
                <label for="rC-${number}">${dataArray[i].oC}</label>
                <br>
                <input type="radio" id="rD-${number}" value="D" name="ans-${number}">
                <label for="rD-${number}">${dataArray[i].oD}</label>
                
                </div>`

                addIn.insertBefore(add, adabfr)

                number++;

            }

        }

        queLength = resObj.questions.length;

        insCodeContainer.innerHTML = ''

        let submitQuiz = document.getElementsByClassName("submit-quiz")[0]

        submitQuiz.innerHTML = '<div class="submit-quiz"><button onclick="finalSubmit()" id="submitQuiz" type="submit">SUBMIT QUIZ</button></div>'
    } catch (error) {
        alert(error)
        window.location.reload();
    }

})


async function finalSubmit() {

    var a = document.children[0].children[1].children[1]

    // console.log(a);

    for (let k = 0; k < a.children.length - 1; k++) {

        let mainRdiv = a.children[k].children[2]

        // console.log(mainRdiv);

        const findCheckedRadio = async (mainRdiv) => {

            for (let m = 0; m < 11; m += 3) {
                if (mainRdiv.children[m].checked) {

                    return ans = mainRdiv.children[m].value;
                }

            }

            return '0';
        }

        var b = findCheckedRadio(mainRdiv)

        // console.log(b);

        answers.push(ans)

    }

    console.log(answers);

    try {
        let Sresponse = await fetch('https://testing-seven-jade.vercel.app/checkanswers', {
            method: "POST",
            mode : 'no-cors',
            body: JSON.stringify(answers),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (Sresponse.ok) {
            const Rscore = await Sresponse.json();
            console.log(Rscore);
        } else {
            console.error('Error: Response not OK', Sresponse.status, Sresponse.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return;
}


