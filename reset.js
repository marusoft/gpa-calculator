const resetSystem = document.querySelector("button#reset");

const resetRecord = (e) => {
  e.preventDefault();
  localStorage.removeItem("annualGrades");
  localStorage.removeItem("gradeSystem");

  const resultsContainer = document.querySelector('.results');
  resultsContainer.innerHTML = '';
  
  const table = document.querySelector("#grade-system");
  table.innerHTML = "";
};

resetSystem.addEventListener("click", resetRecord);
