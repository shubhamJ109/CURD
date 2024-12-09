const API_URL = 'http://localhost:3000/students';

function fetchStudents() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            const studentsList = document.getElementById('students-list');
            studentsList.innerHTML = '';
            data.forEach((student) => {
                studentsList.innerHTML += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.course}</td>
                        <td>
                            <button onclick="editStudent(${student.id})">Edit</button>
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addStudent() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, course })
    }).then(() => fetchStudents());
}

function editStudent(id) {
    const name = prompt('Enter new name:');
    const age = prompt('Enter new age:');
    const course = prompt('Enter new course:');

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, course })
    }).then(() => fetchStudents());
}

function deleteStudent(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    }).then(() => fetchStudents());
}

fetchStudents();
