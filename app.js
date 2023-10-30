console.log('JEOPARDY');
const categoryAmt = 6;
const cluesAmt = 5; 


// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get('https://jservice.io/api/random?count=7');
    console.log(res);
    let catIds = res.data.map(res => (res.category.id) ); //mapping all the ids to a new array called catIds, each id is now in an array.
    //each "item" in the array, give me the id of each "item"

    getCategory(catIds); // this is returning 100 ids

}


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    console.log(catId);
    for(let i = 0; i < catId.length - 1; i++){
        const res = await axios.get(`https://jservice.io/api/category?id=${catId[i]}`);
        // console.log(typeof catId[i]);
        const clues = res.data.clues;
        clues.forEach(element => {
            element.showing = null;    //add key and value that doesn't exist
        });
        const obj = {title: res.data.title, clues,}
        console.log(obj);
        categories.push(obj);
    }
    fillTable(categories);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * tr = table row 
 * td = table data
 * 
 * 
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
//async func???

function fillTable(categories) {
    const table = document.querySelector('#jeopardy');
    const tableHead = document.querySelector('#jeopardy thead');
    const tableBody = document.querySelector('#jeopardy tbody');
    const tableHeaderRow = document.createElement('tr');

    tableHead.append(tableHeaderRow)

    categories.forEach(category =>{
        const title = category.title;
        const titleData = document.createElement('td');
        titleData.innerHTML = title;
        tableHeaderRow.append(titleData);
        console.log(category);

        const tableRow = document.createElement('tr');
        category.clues.forEach(clue => {
            tableRow.innerHTML = `<td>?</td>`
        })
        tableBody.append(tableRow);
    })


}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO