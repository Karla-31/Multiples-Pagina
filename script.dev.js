"use strict";

var currentPage = 1;
var formData = {};

function nextPage() {
  var currentPageElement = document.getElementById("page".concat(currentPage));
  currentPageElement.style.display = 'none';
  currentPage++;
  var nextPageElement = document.getElementById("page".concat(currentPage));
  nextPageElement.style.display = 'block';
}

function prevPage() {
  var currentPageElement = document.getElementById("page".concat(currentPage));
  currentPageElement.style.display = 'none';
  currentPage--;
  var prevPageElement = document.getElementById("page".concat(currentPage));
  prevPageElement.style.display = 'block';
}

function addRelative() {
  var relative = document.getElementById('relative').value;

  if (relative) {
    var relativeList = document.getElementById('relativeList');
    var li = document.createElement('li');
    li.textContent = relative;
    relativeList.appendChild(li);
    formData.relatives = formData.relatives || [];
    formData.relatives.push(relative);
    document.getElementById('relative').value = '';
  }
}

function addCondition() {
  var condition = document.getElementById('condition').value;

  if (condition) {
    var conditionList = document.getElementById('conditionList');
    var li = document.createElement('li');
    li.textContent = condition;
    conditionList.appendChild(li);
    formData.conditions = formData.conditions || [];
    formData.conditions.push(condition);
    document.getElementById('condition').value = '';
  }
}

function addAdmission() {
  var admissionDate = document.getElementById('admissionDate').value;
  var medicalCenter = document.getElementById('medicalCenter').value;
  var diagnosis = document.getElementById('diagnosis').value;

  if (admissionDate && medicalCenter && diagnosis) {
    var admissionList = document.getElementById('admissionList');
    var li = document.createElement('li');
    li.textContent = "Fecha: ".concat(admissionDate, ", Centro M\xE9dico: ").concat(medicalCenter, ", Diagn\xF3stico: ").concat(diagnosis);
    admissionList.appendChild(li);
    formData.admissions = formData.admissions || [];
    formData.admissions.push({
      date: admissionDate,
      center: medicalCenter,
      diagnosis: diagnosis
    });
    document.getElementById('admissionDate').value = '';
    document.getElementById('medicalCenter').value = '';
    document.getElementById('diagnosis').value = '';
  }
}

function submitForm() {
  var name = document.getElementById('name').value;
  formData.name = name;
  var formDataElement = document.getElementById('formData');
  formDataElement.textContent = JSON.stringify(formData, null, 2); // Enviar los datos al servidor

  fetch('/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(function (response) {
    if (response.ok) {
      console.log('Datos enviados con éxito');
    } else {
      console.error('Error al enviar los datos');
    }
  })["catch"](function (error) {
    console.error('Error de red:', error);
  });
} // Mostrar la primera página


document.getElementById('page1').style.display = 'block';