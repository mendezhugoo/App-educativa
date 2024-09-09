let currentLevel = 1;
let score = 0;
let questionCount = 0; // Contador de preguntas

function startGame() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('level-screen').style.display = 'block';
}

function startLevel(level) {
    currentLevel = level;
    score = 0; // Reiniciar puntaje al iniciar nivel
    questionCount = 0; // Reiniciar contador de preguntas
    document.getElementById('check-button').disabled = false; // Asegúrate de habilitar el botón
    document.getElementById('level-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    generateQuestion();
}

function generateQuestion() {
    let maxNumber;
    switch(currentLevel) {
        case 1:
            maxNumber = 10; // Nivel 1: números de 1 a 10
            break;
        case 2:
            maxNumber = 20; // Nivel 2: números de 1 a 20
            break;
        case 3:
            maxNumber = 50; // Nivel 3: números de 1 a 50
            break;
    }

    // Seleccionar una operación aleatoria
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1 = Math.floor(Math.random() * maxNumber) + 1;
    let num2 = Math.floor(Math.random() * maxNumber) + 1;

    let questionText;
    let correctAnswer;

    switch(operation) {
        case '+':
            questionText = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            if (num1 < num2) { // Asegurar que num1 sea mayor o igual a num2 para evitar respuestas negativas
                [num1, num2] = [num2, num1];
            }
            questionText = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
        case '*':
            questionText = `${num1} * ${num2}`;
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Asegurar que la división sea exacta y el resultado un número entero
            num1 = num2 * (Math.floor(Math.random() * maxNumber) + 1);
            questionText = `${num1} / ${num2}`;
            correctAnswer = num1 / num2;
            break;
    }

    document.getElementById('question').textContent = questionText;
    document.getElementById('answer').value = '';
    questionCount++;

    if (questionCount >= 10) {
        document.getElementById('check-button').disabled = true; // Deshabilitar botón de enviar
        showNextLevelPrompt(); // Preguntar si quiere pasar al siguiente nivel
    }
}

function checkAnswer() {
    const answerField = document.getElementById('answer');
    const answer = parseFloat(answerField.value);
    
    // Verificar si el campo de respuesta está vacío
    if (isNaN(answer) || answerField.value.trim() === '') {
        alert('Por favor, ingresa una respuesta.');
        return; // Salir de la función para evitar que se procese una respuesta vacía
    }

    const questionText = document.getElementById('question').textContent;
    const [num1, operation, num2] = questionText.split(' ');

    let correctAnswer;

    switch(operation) {
        case '+':
            correctAnswer = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            correctAnswer = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            correctAnswer = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            correctAnswer = parseFloat(num1) / parseFloat(num2);
            break;
    }

    if (answer === correctAnswer) {
        score += 10 * currentLevel; // Aumenta el puntaje basado en el nivel
        showFeedback('¡Correcto!', 'correct'); // Mostrar mensaje abajo para respuesta correcta
    } else {
        showFeedback(`Incorrecto. La respuesta correcta era ${correctAnswer}.`, 'incorrect');
    }

    if (questionCount < 10) {
        generateQuestion(); // Generar nueva pregunta solo si no se ha llegado al límite
    }
}

// Función para mostrar feedback
function showFeedback(message, type) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback ${type}`;
    feedbackDiv.textContent = message;
    
    document.body.appendChild(feedbackDiv);

    // Cierra automáticamente el feedback después de 5 segundos
    setTimeout(() => {
        feedbackDiv.remove();
    }, 5000);
}

function showNextLevelPrompt() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p>¡Has completado el nivel! ¿Quieres pasar al siguiente nivel?</p>
            <button onclick="proceedToNextLevel()">Sí</button>
            <button onclick="stayOnCurrentLevel()">No</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function proceedToNextLevel() {
    closeModal();
    if (currentLevel < 3) {
        startLevel(currentLevel + 1);
    } else {
        alert('¡Felicidades! Has completado todos los niveles.');
        goHome();
    }
}

function stayOnCurrentLevel() {
    closeModal();
    goHome(); // Regresar al inicio
}

function viewProgress() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('progress-screen').style.display = 'block';
    document.getElementById('score').textContent = `Puntaje Total: ${score}`;
}

function viewScore() {
    alert('Tu puntaje actual es: ' + score);
}

function changeLevel() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('level-screen').style.display = 'block';
}

function goHome() {
    document.getElementById('progress-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('level-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}
