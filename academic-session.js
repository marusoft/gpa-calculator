const submitButton = document.querySelector('button#submit');

const submitResult = (e) => {
  e.preventDefault();

  const gradeObj = JSON.parse(localStorage.getItem('gradeSystem'))

  if (!gradeObj || !Object.keys(gradeObj).length) return alert('Please create a grade system');

  const year = document.querySelector('.year').value;
  const semester = document.querySelector('.semester').value;

  const course = document.querySelector('.course').value;
  const courseGrade = document.querySelector('.course-grade').value;
  const courseUnit = document.querySelector('.course-unit').value;
  const score = document.querySelector('.score').value;

  if (!year || !semester) return alert('Please specify year and semester');

  if (!course || !courseGrade || !courseUnit) {
    return alert('Course, Course Unit, and Course Grade are required');
  }

  const gradeSys = JSON.parse(localStorage.getItem('gradeSystem'));
  if (gradeSys[courseGrade] === undefined) {
    return alert(`Grade ${courseGrade} does not exist in your grading system`)
  }

  if(score){
    const minScore = gradeSys[courseGrade].minScore;
    if(score < minScore){
      return alert(`Minimum score of grade ${courseGrade} is ${minScore}`)
    }
  }


  const academicGrades = JSON.parse(localStorage.getItem('annualGrades')) || {};
  const semesterDetails = {};

  semesterDetails.score = score;
  semesterDetails.unit = courseUnit;
  semesterDetails.grade = courseGrade;

  if (academicGrades[year] === undefined) {
    academicGrades[year] = {};
    academicGrades[year][semester] = {};
    academicGrades[year][semester][course] = semesterDetails;
  } else {
    if (academicGrades[year][semester] === undefined) {
      academicGrades[year][semester] = {};
      academicGrades[year][semester][course] = semesterDetails;
    } else {
      academicGrades[year][semester][course] = semesterDetails;
    }
  }

  localStorage.setItem('annualGrades', JSON.stringify(academicGrades));

  document.querySelector('.course').value = '';
  document.querySelector('.course-grade').value = '';
  document.querySelector('.course-unit').value = '';
  document.querySelector('.score').value = '';
}

submitButton.addEventListener('click', submitResult);
