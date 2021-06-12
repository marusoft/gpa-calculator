const totalUnit = (event) => {
  event.preventDefault();
  moreCourseBtn.disabled = true;
  let courseUnit = document.querySelector(`#unit${i}`).value.trim();
  let gradePoint = document.querySelector(`#gradepoint${i}`).value.trim();
  let course = document.querySelector(`#course${i}`).value.trim();
  let score = document.querySelector(`#score${i}`).value.trim();
  let grade = document.querySelector(`#grade${i}`).value.trim();


  const updateUnits = courseUnit;
  const totalUnitsArray = document.querySelectorAll(".unit");
  let totalUnits = 0;

  
  const validateCourse = /^([A-Za-z0-9- ]){2,30}$/.test(course);
  const validateUnit = /^[0-9]\d*(\.\d+)?$/.test(courseUnit);
  const validateScore = /^\+?[0-9][\d]*$/.test(score);
  const validateGrade = /[A-Z]/.test(grade);
  if (!validateCourse || !validateUnit || !validateScore || !validateGrade) {
    document.querySelector(`#unit${i}`).setAttribute("value", "");
    moreCourseBtn.disabled = true;
    moreCourseBtn.removeAttribute("style");


    for (let k = 0; k < totalUnitsArray.length; k++) {
      if (parseFloat(totalUnitsArray[k].value))
      totalUnits += parseFloat(totalUnitsArray[k].value);
    }
    document.querySelector("#t-units").innerHTML = totalUnits.toFixed(2);
    return;
  }
  // document.querySelector(`#unit${i}`).setAttribute('value', totalUnits.toFixed(2));
  totalUnit += courseUnit.toFixed(2);
    // moreCourseBtn.disabled = false;
    // moreCourseBtn.style.background = '#00994d';
    // moreCourseBtn.style.color = '#fff';
    // clearAllFieldBtn.disabled = false;
    // clearAllFieldBtn.style.background = '#cc0000'
    // clearAllFieldBtn.style.color = '#fff';

    for (let k = 0; k < totalUnitsArray.length; k++) {
      if (parseFloat(totalUnitsArray[k].value))
      totalUnits += parseFloat(totalUnitsArray[k].value);
    }
    document.querySelector("#t-units").innerHTML = totalUnits.toFixed(2);

};
document.addEventListener('keyup', totalUnit);