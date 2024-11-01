let currentPage = 1;
const formData = {};

function nextPage() {
    const currentPageElement = document.getElementById(`page${currentPage}`);
    currentPageElement.style.display = 'none';
    currentPage++;
    const nextPageElement = document.getElementById(`page${currentPage}`);
    nextPageElement.style.display = 'block';
}

function prevPage() {
    const currentPageElement = document.getElementById(`page${currentPage}`);
    currentPageElement.style.display = 'none';
    currentPage--;
    const prevPageElement = document.getElementById(`page${currentPage}`);
    prevPageElement.style.display = 'block';
}

function addRelative() {
    const relative = document.getElementById('relative').value;
    if (relative) {
        const relativeList = document.getElementById('relativeList');
        const li = document.createElement('li');
        li.textContent = relative;
        relativeList.appendChild(li);
        formData.relatives = formData.relatives || [];
        formData.relatives.push(relative);
        document.getElementById('relative').value = '';
    }
}

function addCondition() {
    const condition = document.getElementById('condition').value;
    if (condition) {
        const conditionList = document.getElementById('conditionList');
        const li = document.createElement('li');
        li.textContent = condition;
        conditionList.appendChild(li);
        formData.conditions = formData.conditions || [];
        formData.conditions.push(condition);
        document.getElementById('condition').value = '';
    }
}

function addAdmission() {
    const admissionDate = document.getElementById('admissionDate').value;
    const medicalCenter = document.getElementById('medicalCenter').value;
    const diagnosis = document.getElementById('diagnosis').value;
    if (admissionDate && medicalCenter && diagnosis) {
        const admissionList = document.getElementById('admissionList');
        const li = document.createElement('li');
        li.textContent = `Fecha: ${admissionDate}, Centro Médico: ${medicalCenter}, Diagnóstico: ${diagnosis}`;
        admissionList.appendChild(li);
        formData.admissions = formData.admissions || [];
        formData.admissions.push({ date: admissionDate, center: medicalCenter, diagnosis: diagnosis });
        document.getElementById('admissionDate').value = '';
        document.getElementById('medicalCenter').value = '';
        document.getElementById('diagnosis').value = '';
    }
}

function submitForm() {
    const name = document.getElementById('name').value;
    formData.name = name;
    const formDataElement = document.getElementById('formData');
    formDataElement.textContent = JSON.stringify(formData, null, 2);

    // Enviar los datos al servidor
    fetch('file:///C:/xampp/htdocs/Formulario/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Datos enviados con éxito');
        } else {
            console.error('Error al enviar los datos');
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
    });
}

// Mostrar la primera página
document.getElementById('page1').style.display = 'block';
