        // Quando a página (HTML) estiver pronta, o código começa a rodar
        document.addEventListener('DOMContentLoaded', () => {
            // Guardamos os elementos importantes em variáveis
            const form = document.getElementById('dispensa');
            const ExibirReceitas = document.getElementById('exibir-receitas');
            const MensagemFeedback = document.getElementById('feedback');

            // --- Livro de Receitas (A Lista de Receitas) ---
            // É uma lista (Array) de objetos de receitas.
            const RECEITAS = [
                {
                    nome: "Bolo de Chocolate",
                    ingredientes: ["ovos", "farinha", "leite", "açúcar", "chocolate", "manteiga"],
                    descrição: "Um bolo rico e fofo, ideal para qualquer celebração.",
                    instruções: [
                        "Misture a farinha, o açúcar e o chocolate em pó.",
                        "Adicione os ovos, o leite e a manteiga derretida.",
                        "Bata bem até a massa ficar homogênea e despeje em uma forma untada.",
                        "Asse em forno pré-aquecido a 180°C por cerca de 40 minutos."
                    ],
                    tipo: "Sobremesa"
                },
                {
                    nome: "Panquecas de Café da Manhã",
                    ingredientes: ["ovos", "farinha", "leite", "açúcar"],
                    descrição: "Clássicas e rápidas, a base perfeita para mel ou frutas.",
                    instruções: [
                        "Bata os ovos, o leite e o açúcar em uma tigela.",
                        "Adicione a farinha aos poucos, misturando até ficar homogêneo.",
                        "Aqueça e unte uma frigideira. Despeje uma concha da massa.",
                        "Frite dos dois lados até dourar e empilhe para servir."
                    ],
                    tipo: "Café da Manhã"
                },
                {
                    nome: "Frango Agridoce com Arroz",
                    ingredientes: ["frango", "arroz", "tomate"],
                    descrição: "Um prato principal saboroso com um toque de molho de tomate caseiro.",
                    instruções: [
                        "Cozinhe o arroz soltinho.",
                        "Tempere e frite o frango em cubos até dourar.",
                        "Adicione o tomate picado (e um pouco de água se necessário) para criar um molho simples e encorpado.",
                        "Sirva o frango com o molho por cima do arroz."
                    ],
                    tipo: "Almoço/Jantar"
                },
                {
                    nome: "Omelete Simples",
                    ingredientes: ["ovos", "manteiga"],
                    descrição: "Rápida fonte de proteína, perfeita para um lanche ou refeição leve.",
                    instruções: [
                        "Bata os ovos com sal e pimenta.",
                        "Derreta a manteiga em uma frigideira antiaderente.",
                        "Despeje os ovos batidos e cozinhe até as bordas firmarem.",
                        "Dobre a omelete ao meio e sirva imediatamente."
                    ],
                    tipo: "Lanche"
                }
            ];
            
            /**
             * Função para verificar se o usuário tem TODOS os ingredientes necessários 
             * para fazer uma receita.
             * * A função usa um loop for simples e o método .includes() (que é fácil de entender) 
             * para checar se cada item necessário está na lista disponível.
             * * @param {string[]} required - Ingredientes que a receita exige.
             * @param {string[]} available - Ingredientes que o usuário selecionou.
             * @returns {boolean} - Retorna true se puder fazer, false se faltar algo.
             */
            function TodosIngredientes(required, available) {
                let podeFazer = true; // Começamos achando que sim
                
                // Percorre a lista de ingredientes que a receita precisa
                for (let i = 0; i < required.length; i++) {
                    const ingredienteNecessario = required[i];
                    
                    // Checa se o usuário tem esse ingrediente na sua lista (available)
                    if (available.includes(ingredienteNecessario) === false) {
                        podeFazer = false; // Se faltar um, marca como 'não pode fazer'
                        break; // Para de olhar, pois já sabemos que falta
                    }
                }
                
                return podeFazer;
            }

            /**
             * Função para mostrar o resultado da busca na tela.
             * @param {Object|null} receita - A receita encontrada ou null.
             * @param {number} Selecionado - Quantidade de ingredientes selecionados.
             */
            function Resultado(receita, Selecionado) {
                // Limpa as mensagens antigas
                ExibirReceitas.innerHTML = '';
                MensagemFeedback.innerHTML = '';
                
                if (receita) {
                    // 1. Exibe a mensagem de sucesso (Feedback)
                    MensagemFeedback.innerHTML = `
                        <div class="alert alert-success d-flex align-items-center rounded-3 shadow-sm" role="alert">
                            <i class="fas fa-utensils me-2"></i>
                            <div><strong>Sucesso!</strong> Aqui está uma receita incrível para você.</div>
                        </div>
                    `;

                    // 2. Monta a lista de instruções de preparo
                    let listaInstruções = '';
                    // Faz um loop simples para montar a lista de passos
                    for (let i = 0; i < receita.instruções.length; i++) {
                        const passo = receita.instruções[i];
                        const numeroPasso = i + 1;
                        
                        // Adiciona cada passo à nossa string listaInstruções
                        listaInstruções += `
                            <li class="list-group-item border-0 px-0">
                                <span class="badge bg-success me-2">${numeroPasso}</span> ${passo}
                             </li>
                        `;
                    }

                    // 3. Monta o cartão completo da receita
                    ExibirReceitas.innerHTML = `
                        <div class="card w-100 border-0 shadow-lg" style="border-radius: 1rem;">
                            <div class="card-header bg-success text-white rounded-top-4">
                                <h4 class="mb-0">${receita.nome}</h4>
                                <p class="mb-0"><small>(${receita.tipo})</small></p>
                            </div>
                            <div class="card-body">
                                <p class="card-text text-success fw-bold">${receita.descrição}</p>
                                <h5 class="mt-3 text-secondary">Modo de Preparo:</h5>
                                <ul class="list-group list-group-flush">
                                    ${listaInstruções}
                                </ul>
                                <h5 class="mt-4 text-secondary">Ingredientes Utilizados:</h5>
                                <p class="text-muted">${receita.ingredientes.join(', ')}.</p>
                            </div>
                        </div>
                    `;
                } else {
                    // Caso nenhuma receita seja encontrada (Mensagem de erro/aviso)
                    MensagemFeedback.innerHTML = `
                        <div class="alert alert-warning d-flex align-items-center rounded-3 shadow-sm" role="alert">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <div><strong>Ops!</strong> Não consegui montar uma receita completa com ${Selecionado} ingredientes.</div>
                        </div>
                    `;
                    ExibirReceitas.innerHTML = `
                        <p class="text-muted text-center p-5">
                            Parece que você tem não ingredientes suficientes. Que tal adicionar mais alguns itens na receita ou tentar uma mais simples?
                        </p>
                    `;
                }
            }

            // --- Evento de Envio do Formulário ---
            // Quando o usuário clica no botão "Encontrar Receita"
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // Impede o envio do formulário padrão da web

                // Pega todas as caixas de seleção que estão marcadas
                const checkboxesMarcadas = form.querySelectorAll('input[type="checkbox"]:checked');
                const Selecionado = []; // Lista para guardar o nome dos ingredientes que o usuário tem

                // Faz um loop simples para pegar os VALORES (nomes) dos ingredientes
                for (let i = 0; i < checkboxesMarcadas.length; i++) {
                    const checkbox = checkboxesMarcadas[i];
                    Selecionado.push(checkbox.value); // Adiciona o nome ('ovos', 'farinha', etc.) à lista
                }
                
                // Validação: Caso não selecionou nada
                if (Selecionado.length === 0) {
                    MensagemFeedback.innerHTML = `
                        <div class="alert alert-danger d-flex align-items-center rounded-3 shadow-sm" role="alert">
                            <i class="fas fa-times-circle me-2"></i>
                            <div><strong>Erro de Validação:</strong> Você precisa selecionar pelo menos um ingrediente!</div>
                        </div>
                    `;
                    ExibirReceitas.innerHTML = `
                        <p class="text-muted text-center p-5">
                            Selecione seus ingredientes ao lado e clique em "Encontrar Receita" para ver a mágica acontecer.
                        </p>
                    `;
                    return; // Para o código aqui
                }

                // Busca a Receita
                let ReceitaEncontrada = null;
                
                // Percorre a lista de receitas, uma por uma
                for (let i = 0; i < RECEITAS.length; i++) {
                    const receita = RECEITAS[i];
                    
                    // Usa a função simples para checar se pode fazer esta receita
                    if (TodosIngredientes(receita.ingredientes, Selecionado)) {
                        ReceitaEncontrada = receita; // Guarda a receita
                        break; 
                    }
                }

                // Resultados
                Resultado(ReceitaEncontrada, Selecionado.length);
            });
        });