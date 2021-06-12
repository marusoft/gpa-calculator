const getResult = document.querySelector('button#submit');

const results = (e) => {
  e.preventDefault();

  const gradingSystem = JSON.parse(localStorage.getItem('gradeSystem'));
  const annualGrades = JSON.parse(localStorage.getItem('annualGrades'));

  const resultsContainer = document.querySelector('.results');
  resultsContainer.innerHTML = '';

  let cumulativeUnits = 0;
  let cumulativePoints = 0;

  for (let i in annualGrades) {
    const year = document.createElement('h3');
    year.innerHTML = `Year ${i}`;

    resultsContainer.appendChild(year);

    const table = document.createElement('table');
    table.setAttribute('border', 1);
    table.innerHTML = `
      <tr>
        <th>Course</th>
        <th>Unit</th>
        <th>Grade</th>
        <th>Score</th>
      </tr>
    `;

    let totalSessionUnit = 0;
    let totalSessionPoint = 0;

    for (let j in annualGrades[i]) {
      const semesterRow = document.createElement('div');
      semesterRow.innerHTML = `
        <div">Semester ${j}</div>
      `;

      table.appendChild(semesterRow);

      let totalSemesterUnit = 0;
      let totalSemesterPoint = 0;

      for (let k in annualGrades[i][j]) {
        const courseRow = document.createElement('tr');
        const courseGrade = annualGrades[i][j][k].grade;
        courseRow.innerHTML = `
          <td>${k}</td>
          <td>${annualGrades[i][j][k].unit}</td>
          <td>${courseGrade}</td>
          <td>${annualGrades[i][j][k].score}</td>
        `

        table.appendChild(courseRow);

        totalSemesterUnit += (Number(annualGrades[i][j][k].unit));
        totalSemesterPoint += (Number(annualGrades[i][j][k].unit * gradingSystem[courseGrade].point));
      }

      const totalRow = document.createElement('tr');
      totalRow.innerHTML = `
        <td>Total Unit = ${totalSemesterUnit.toFixed(2)}</td>
        <td>Total Point = ${totalSemesterPoint.toFixed(2)}</td>
      `;

      table.appendChild(totalRow);

      const SemesterGPA = Number(totalSemesterPoint / totalSemesterUnit);

      const semesterGPARow = document.createElement('tr');
      semesterGPARow.innerHTML = `
        <td>GPA = ${SemesterGPA.toFixed(2)}</td>
      `;

      table.appendChild(semesterGPARow);

      totalSessionUnit += totalSemesterUnit;
      totalSessionPoint += totalSemesterPoint;
    }

    const sessionGPADiv = document.createElement('div');
    const sessionGPA = Number(totalSessionPoint / totalSessionUnit);
    sessionGPADiv.innerHTML = `
      <div>Total session Unit = ${totalSessionUnit.toFixed(2)}</div>
      <div>Total session Point = ${totalSessionPoint.toFixed(2)}</div>
      <div>Total session GPA = ${sessionGPA.toFixed(2)}</div>
      <br />
    `;

    resultsContainer.appendChild(table);
    resultsContainer.appendChild(sessionGPADiv);

    cumulativeUnits += totalSessionUnit;
    cumulativePoints += totalSessionPoint;
  }

  const cumulativeGPA = Number(cumulativePoints / cumulativeUnits) || 0;
  const cumulativeGPADiv = document.createElement('div');
  cumulativeGPADiv.innerHTML = `
    <div>Cumulative Total Unit = ${cumulativeUnits.toFixed(2)}</div>
    <div>Cumulative Total Point = ${cumulativePoints.toFixed(2)}</div>
    <div>Cumulative GPA = ${cumulativeGPA.toFixed(2)}</div>
  `;

  resultsContainer.appendChild(cumulativeGPADiv);
}

window.onload = (e) => results(e);
getResult.addEventListener('click', results);
