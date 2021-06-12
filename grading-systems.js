const button = document.querySelector("button#create");

const gradingSystem = (e) => {
  e.preventDefault();

  const grade = document.querySelector("#grade").value;
  const point = document.querySelector("#point").value;
  const minScore = document.querySelector("#min-score").value;

  if (!grade || !point || !minScore)
    return alert("Please create a valid Grading System");

  const gradeObj = JSON.parse(localStorage.getItem("gradeSystem")) || {};

  const gradeValues = {};
  gradeValues.minScore = minScore;
  gradeValues.point = point;

  gradeObj[grade] = gradeValues;

  localStorage.setItem("gradeSystem", JSON.stringify(gradeObj));

  const updatedGradeSys = JSON.parse(localStorage.getItem("gradeSystem"));
  const table = document.querySelector("#grade-system");
  table.innerHTML = "";
  table.innerHTML = `
    <tr>
      <th>Grade</th>
      <th>Point</th>
      <th>Minimum Score</th>
    </tr>
  `;

  for (let i in updatedGradeSys) {
    const tRow = document.createElement("tr");
    tRow.innerHTML = `
      <td>${i}</td>
      <td>${updatedGradeSys[i].point}</td>
      <td>${updatedGradeSys[i].minScore}</td>
    `;

    table.appendChild(tRow);
  }

  document.querySelector("#grade").value = "";
  document.querySelector("#point").value = "";
  document.querySelector("#min-score").value = "";
};

button.addEventListener("click", gradingSystem);
