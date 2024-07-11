document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    
    fetchTasks();

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        const response = await fetch('/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status: 'pendiente' })
        });

        if (response.ok) {
            const newTask = await response.json();
            appendTaskToList(newTask);
            taskForm.reset();
        }
    });

    // Funcion para obtener las tareas
    async function fetchTasks() {
        const response = await fetch('/task');
        const tasks = await response.json();
        tasks.forEach(task => appendTaskToList(task));
    }

    // Funcion para agrregar tarea 
    function appendTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = `${task.title}: ${task.description} `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', async () => {
            const response = await fetch(`/task/${task.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                li.remove();
            }
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            const newTitle = prompt('Ingresa nuevo titulo:', task.title);
            const newDescription = prompt('Ingresa nueva descripcion:', task.description);
            const newStatus = prompt('Ingresa nuevo estado (pendiente/completado):', task.status);
            if (newTitle && newDescription && newStatus) {
                updateTask(task.id, newTitle, newDescription, newStatus, li);
            }
        });

        const toggleStatusButton = document.createElement('button');
        toggleStatusButton.textContent = task.status ;
        toggleStatusButton.classList.add(task.status);
        toggleStatusButton.addEventListener('click', () => {
            const newStatus = task.status === 'pendiente' ? 'completado' : 'pendiente';
            updateTask(task.id, task.title, task.description, newStatus, li);
        });

        li.appendChild(toggleStatusButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Funcion para modificar la tarea
    async function updateTask(id, title, description, status, li) {
        const response = await fetch(`/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        });

        if (response.ok) {
            const updatedTask = await response.json();
            li.textContent = `${updatedTask.title}: ${updatedTask.description} `;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', async () => {
                const response = await fetch(`/task/${updatedTask.id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    li.remove();
                }
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => {
                const newTitle = prompt('Ingresa nuevo titulo:', updatedTask.title);
                const newDescription = prompt('Ingresa nueva descripcion:', updatedTask.description);
                const newStatus = prompt('Ingresa nuevo estado (pendiente/completado):', updatedTask.status);
                if (newTitle && newDescription && newStatus) {
                    updateTask(updatedTask.id, newTitle, newDescription, newStatus, li);
                }
            });

            const toggleStatusButton = document.createElement('button');
            toggleStatusButton.textContent = updatedTask.status;
            toggleStatusButton.classList.add(updatedTask.status);
            toggleStatusButton.addEventListener('click', () => {
                const newStatus = updatedTask.status === 'pendiente' ? 'completado' : 'pendiente';
                updateTask(updatedTask.id, updatedTask.title, updatedTask.description, newStatus, li);
            });

            li.appendChild(toggleStatusButton);
            li.appendChild(editButton);
            li.appendChild(deleteButton);

        }
    }
});