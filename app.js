const moreCourseBtn = document.querySelector("#create-course");
const clearAllFieldBtn = document.querySelector("#clear-all-field");
const totalUnits = document.querySelector("#t-units");
const totalPoints = document.querySelector("#t-points");
const gradePointAverage = document.querySelector("#grade-point-average");
const courseForm = document.querySelector(".form-field");

let i = 1;
const increment = () => {
  i += 1;
};

const loadGpaCalculator = () => {
  moreCourseBtn.disabled = true;
  clearAllFieldBtn.disabled = true;
  clearAllFieldBtn.removeAttribute("style");
  moreCourseBtn.removeAttribute("style");
  totalUnits.innerHTML = 0;
  totalPoints.innerHTML = 0;
  gradePointAverage.innerHTML = 0;

  courseForm.innerHTML = `
  <div class="first-course-form">
    <ul>
      <li>
        <input type ="text" class = "course" id = "course${i}" required placeholder = "Enter Course" autofocus/>
      </li>
      <li>
        <input type ="number" class = "unit" id = "unit${i}" required placeholder = "Enter Course Unit" />
      </li>
      <li>
       <input type ="number" class = "score" id = "score${i}" required placeholder = "Enter Score" />
      </li>
      <li>
        <input type ="text" class = "grade" id = "grade${i}" required placeholder = "Enter Grade" autofocus/>
      </li>
      <li>
        <input type ="number" class = "gradepoint" id = "gradepoint${i}" required placeholder = "Enter Grade point" autofocus/>
      </li>
      <li>
        <span><input id="total-point${i}" class="total-point" placeholder="total-point" readonly></span>
      </li>
   </ul>
  <div>
  `;
};
window.onload = loadGpaCalculator();

const newCourseForm = (event) => {
  event.preventDefault();
  let newDiv = document.createElement("DIV");
  increment();
  newDiv.innerHTML = `
  <ul>
      <li>
        <input type ="text" class = "course" id = "course${i}" required placeholder = "Enter Course" />
      </li>
      <li>
        <input type ="number" class = "unit" id = "unit${i}" required placeholder = "Enter Course Unit" />
      </li>
      <li>
       <input type ="number" class = "score" id = "score${i}" required placeholder = "Enter Score" />
      </li>
      <li>
        <input type ="text" class = "grade" id = "grade${i}" required placeholder = "Enter Grade" />
      </li>
      <li>
        <input type ="number" class = "gradepoint" id = "gradepoint${i}" required placeholder = "Enter Grade point" />
      </li>
      <li>
        <span><input id="total-point${i}" class="total-point" placeholder="Total Point" readonly></span>
      </li>
   </ul>
  `;

  const form = document.querySelector(".form-field");
  form.insertBefore(newDiv, form.childNodes[0]);
  const course = document.querySelector(`#course${i - 1}`);
  course.setAttribute("readonly", "readonly");
  course.removeAttribute("class");
  document.querySelector(`#unit${i - 1}`).setAttribute("readonly", "readonly");
  document.querySelector(`#unit${i - 1}`).removeAttribute("class");
  document.querySelector(`#score${i - 1}`).setAttribute("readonly", "readonly");
  document.querySelector(`#score${i - 1}`).removeAttribute("class");
  document.querySelector(`#grade${i - 1}`).setAttribute("readonly", "readonly");
  document.querySelector(`#grade${i - 1}`).removeAttribute("class");
  document
    .querySelector(`#gradepoint${i - 1}`)
    .setAttribute("readonly", "readonly");
  document.querySelector(`#gradepoint${i - 1}`).removeAttribute("class");
  moreCourseBtn.disabled = true;
  moreCourseBtn.removeAttribute("style");
};
moreCourseBtn.addEventListener("click", newCourseForm);

const totalPoint = (event) => {
  event.preventDefault();
  moreCourseBtn.disabled = true;
  let courseUnit = document.querySelector(`#unit${i}`).value.trim();
  let gradePoint = document.querySelector(`#gradepoint${i}`).value.trim();
  let course = document.querySelector(`#course${i}`).value.trim();
  let score = document.querySelector(`#score${i}`).value.trim();
  let grade = document.querySelector(`#grade${i}`).value.trim();


  let totalUnits = 0;
  let totalPoints = 0;
  let gradePointAverage = 0;


  const point = courseUnit * gradePoint;
  const cummulativeGradePointAverage = totalPoint / totalUnits

  const totalUnitsArray = document.querySelectorAll(".unit");
  const totalPointsArray = document.querySelectorAll(".total-point");



  const validateCourse = /^([A-Za-z0-9- ]){2,30}$/.test(course);
  const validateUnit = /^[0-9]\d*(\.\d+)?$/.test(courseUnit);
  const validateScore = /^\+?[0-9][\d]*$/.test(score);
  const validateGrade = /[A-Z]/.test(grade);
  if (!validateCourse || !validateUnit || !validateScore || !validateGrade) {
    document.querySelector(`#total-point${i}`).setAttribute("value", "");
    moreCourseBtn.disabled = true;
    moreCourseBtn.removeAttribute("style");

    for (let j = 0; j < totalPointsArray.length; j++) {
      if (parseFloat(totalPointsArray[j].value))
      totalPoints += parseFloat(totalPointsArray[j].value);
    }
    document.querySelector("#t-points").innerHTML = totalPoints.toFixed(2);
    return;
  }
  document.querySelector(`#total-point${i}`).setAttribute('value', point.toFixed(2));
    moreCourseBtn.disabled = false;
    moreCourseBtn.style.background = '#00994d';
    moreCourseBtn.style.color = '#fff';
    clearAllFieldBtn.disabled = false;
    clearAllFieldBtn.style.background = '#cc0000'
    clearAllFieldBtn.style.color = '#fff';

    for (let j = 0; j < totalPointsArray.length; j++) {
      if (parseFloat(totalPointsArray[j].value))
      totalPoints += parseFloat(totalPointsArray[j].value);
    }
    document.querySelector("#t-points").innerHTML = totalPoints.toFixed(2);
};
document.addEventListener('keyup', totalPoint);


clearAllFieldBtn.addEventListener('click', loadGpaCalculator);
