window.addEventListener("load", function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("conteudo").classList.remove("hidden");
});

// Definir perguntas
const perguntas = [
    "Adapto-me facilmente a novos desafios e ambientes para iniciar projetos ou ajudar pessoas a construírem bases sólidas em suas vidas.",
    "Tenho facilidade em inspirar e orientar pessoas com mensagens claras e impactantes, ajudando-as a encontrar direção.",
    "Gosto de ajudar as pessoas a tomarem decisões importantes que podem transformar suas vidas.",
    "Sinto satisfação em orientar e acompanhar o crescimento pessoal e desenvolvimento de um grupo.",
    "Presto atenção aos detalhes e busco formas de tornar o aprendizado mais claro e acessível para os outros.",
    "Consigo enxergar como um grupo ou organização pode funcionar de forma saudável e produtiva.",
    "Gosto de compartilhar conhecimento e sou frequentemente chamado para falar ou ensinar em diferentes ambientes.",
    "Tenho facilidade para iniciar conversas com desconhecidos e guiá-los a reflexões importantes.",
    "Sinto satisfação em apoiar pessoas que enfrentam dificuldades e ajudá-las a se reerguer.",
    "Gosto de compreender bem assuntos complexos e torná-los mais fáceis para os outros entenderem.",
    "Tenho prazer em ensinar e transmitir conhecimento de forma clara e prática.",
    "Consigo perceber quando alguém precisa de ajuda e costumo agir para apoiar essa pessoa de maneira prática.",
    "Gosto de organizar tarefas, eventos ou recursos para atingir objetivos específicos.",
    "Tenho facilidade para identificar talentos e habilidades em outras pessoas e incentivá-las a desenvolvê-los.",
    "Consigo explicar ideias ou conceitos complicados de forma simples e acessível.",
    "Sinto-me realizado ao oferecer apoio emocional e motivação para quem passa por dificuldades.",
    "Tenho facilidade para liderar grupos ou motivar pessoas a trabalharem juntas por um objetivo.",
    "Me preocupo com o bem-estar e desenvolvimento das pessoas ao meu redor e busco maneiras de ajudá-las.",
    "Gosto de ajudar outras pessoas a construírem bases sólidas para suas vidas, oferecendo direcionamento e apoio.",
    "Tenho prazer em aprender coisas novas e compartilhar esse conhecimento com os outros.",
    "Sinto-me motivado a iniciar projetos ou atividades que ajudem pessoas fora do meu círculo habitual.",
    "Quando vejo um problema, acredito que a melhor forma de resolvê-lo é transmitindo conhecimento e direcionamento.",
    "Minhas conversas frequentemente giram em torno de ajudar pessoas a encontrarem um propósito maior.",
    "Sinto-me confortável ao dar orientações e direcionamento para grupos ou indivíduos.",
    "Quando percebo que uma informação está sendo ensinada de forma errada, fico inquieto e desejo esclarecer o assunto."
];

let paginaAtual = 1;
let totalPaginas = Math.ceil(perguntas.length / 5);
let respostas = JSON.parse(localStorage.getItem('respostas')) || [];

// Função para carregar as perguntas e respostas
function carregarPerguntas() {
    const inicio = (paginaAtual - 1) * 5;
    const perguntasPagina = perguntas.slice(inicio, inicio + 5);
    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = '';

    perguntasPagina.forEach((pergunta, index) => {
        const perguntaElement = document.createElement('div');
        perguntaElement.classList.add('pergunta');

        perguntaElement.innerHTML = `
            <p>${pergunta}</p>
            <div class="radio-group">
                ${[0, 1, 2, 3, 4, 5].map(i => `
                    <input type="radio" name="resposta_${inicio + index}" value="${i}" id="resposta_${inicio + index}_${i}" ${respostas[inicio + index] === i ? 'checked' : ''}>
                    <label for="resposta_${inicio + index}_${i}">${i}</label>
                `).join('')}
            </div>
        `;

        quizForm.appendChild(perguntaElement);
    });

    // Atualizar o progresso
    const progresso = (paginaAtual / totalPaginas) * 80;
    document.querySelector('.progress-bar').style.width = progresso + '%';
}

// Função para processar respostas e avançar
function processarRespostas() {
    const formData = new FormData(document.getElementById('quizForm'));
    formData.forEach((valor, chave) => {
        const perguntaIndex = parseInt(chave.split('_')[1]);
        respostas[perguntaIndex] = parseInt(valor);
    });

    localStorage.setItem('respostas', JSON.stringify(respostas));

    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        carregarPerguntas();
    } else {
        window.location.href = 'resultado.html'; // ou outro arquivo que contenha o resultado
    }
}

// Carregar perguntas na primeira página
carregarPerguntas();

// Adicionar evento para o botão "Próxima Página"
document.getElementById('nextPageButton').addEventListener('click', function(event) {
    event.preventDefault();
    processarRespostas();
});