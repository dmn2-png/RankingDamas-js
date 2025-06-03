const prompt = require('prompt-sync')();

function main() {
    console.log("\n DAMAS: RANKING")
    let jogadores = [];
    let historico = [];
    mostrarMenu();

    function menu() {
        //mostra o menu inicial
        console.log("\n--- MENU INICIAL ---");
        console.log("1. Cadastrar jogador");
        console.log("2. Registrar partida");
        console.log("3. Exibir ranking");
        console.log("4. Histórico de partidas");
        console.log("5. Sair \n");
    }
    
    function mostrarMenu() {
        //usuário escolhe a opção desejada
        let opcao = 0;
        while (opcao !== 5) {
            menu();
            opcao = parseInt(prompt("Escolha uma opção: "));

            if (opcao === 1) {
                cadastrarJogadores();
            } else if (opcao === 2) {
                registrarPartida();
            } else if (opcao === 3) {
                organizaArray();
                exibirRanking();
            } else if (opcao === 4) {
                mostrarHistorico();
            } else if (opcao === 5) {
                break;
            } else {
                console.log("Opção inválida.");
            }
        }
    }


    function jogadorRepetido(nome) {
        //verifica se há nome repetido dos jogadores
        for(let i = 0; i < jogadores.length; i++) {
            if(jogadores[i].nome === nome) {
                return true;
            }
        }
        return false;
    }


    function cadastrarJogadores() {
        let quantidade = parseInt(prompt("Quantos jogadores deseja cadastrar? "));

        //cadastra a quantidade desejada de jogadores
        for(let i = 0; i < quantidade; i++) {
            let nome = prompt(`Digite o nome do jogador ${i + 1}: `).toLowerCase();

            //enquanto houver nome repetido, pede ao usuário para digitar um nome novamente
            while (jogadorRepetido(nome) === true) {
                console.log("Erro! Jogador repetido, tente novamente.");
                nome = prompt(`Digite o nome do jogador ${i + 1}: `).toLowerCase();
            }

            //cria um objeto com as informações do jogador
            let jogador = {
                nome: nome,
                vitorias: 0,
                derrotas: 0,
                empates: 0
            };

            //armazena cada objeto do jogador dentro do array de jogadores
            jogadores.push(jogador);
        }
        console.log("Jogadores cadastrados! \n")
        return jogadores;
    }

    
    function jogadorCadastrado(nome) {
        //verifica se o jogador está cadastrado
        for (let i = 0; i < jogadores.length; i++) {
            if (jogadores[i].nome === nome.toLowerCase()) {
                return jogadores[i];
            }
        }
        return undefined;
    }


    function listaDeJogadores() {
        //retorna a lista com o nome dos jogadores cadastrados
        console.log("\nJogadores cadastrados:");
        for (let i = 0; i < jogadores.length; i++) {
            console.log(`${i + 1}. ${jogadores[i].nome}`);
        }
    }


    function atualizarResultado(jogador1, jogador2, resultado) {
        //atualiza a pontuação de cada jogador de acordo com o resultado
        if (resultado === jogador1.nome) {
            jogador1.vitorias++;
            jogador2.derrotas++;
        } else if (resultado === jogador2.nome) {
            jogador2.vitorias++;
            jogador1.derrotas++;
        } else if (resultado === "empate") {
            jogador1.empates++;
            jogador2.empates++;
        } else {
            console.log("Resultado inválido!");
        }
    }


    function registrarPartida() {
        //verifica se há pelo menos 2 jogadores cadastrados
        if (jogadores.length < 2) {
            console.log("Cadastre pelo menos dois jogadores.");
            return;
        }

        //exibe a lista dos jogadores cadastrados
        listaDeJogadores();

        //solicita o nome dos jogadores da partida
        let nome1 = prompt("Digite o nome do jogador 1: ").toLowerCase();
        let nome2 = prompt("Digite o nome do jogador 2: ").toLowerCase();

        //se os nomes forem iguais retorna para o início
        if (nome1 === nome2) {
            console.log("Jogador repetido.");
            return;
        }

        //busca o objeto do jogador pelo nome
        let jogador1 = jogadorCadastrado(nome1);
        let jogador2 = jogadorCadastrado(nome2);

        //se o jogador não estiver cadastrado retorna ao inicio
        if(!jogador1 || !jogador2) {
            console.log("Jogador inválido")
            return;
        }

        let resultado = prompt("Resultado da partida (nome do vencedor ou 'empate'): ").toLowerCase();

        atualizarResultado(jogador1, jogador2, resultado);

        //armazena no array de histórico um objeto com o registro da partida
        historico.push({
            jogador1: jogador1.nome,
            jogador2: jogador2.nome,
            resultado: resultado
        });
    }

    function organizaArray() {
        //verifica se há jogador cadastrado para exibir o ranking
        if(jogadores.length === 0) {
            console.log("Erro! Jogador não cadastrado")
            return;
        }

        for (let i = 0; i < jogadores.length; i++) {
            jogadores[i].pontos = (jogadores[i].vitorias * 2 + jogadores[i].empates * 1);
        }
        
        jogadores.sort(function(a, b) {
            return b.pontos - a.pontos;
        });
    }

        function exibirRanking() {
        //exibe o ranking
        console.log("\n--- RANKING ---");
        console.log("Colocação | Jogador | Pontuação | V, D, E")        
        for (let i = 0; i < jogadores.length; i++) {
            let medalha = "";

            if (i === 0) {
                medalha = "🥇";
            } else if (i === 1) {
                medalha = "🥈";
            } else {
                medalha = "😿";
            }
            console.log(`${i + 1}° lugar ${medalha}: ${jogadores[i].nome} - ${jogadores[i].pontos} pontos - ${jogadores[i].vitorias}, ${jogadores[i].derrotas}, ${jogadores[i].empates}`);
        }
    
    }


    function mostrarHistorico() {
        //exibe mensagem se não houver partida registrada
        if (historico.length === 0) {
            console.log("Nenhuma partida registrada ainda.\n");
            return;
        }

        //exibe o histórico de partida 
        console.log("\n--- HISTÓRICO DE PARTIDAS ---");
        for (let i = 0; i < historico.length; i++) {
            let partida = historico[i];
            let resultado = "";

            if (partida.resultado === "empate") {
                resultado = "Empate";
            } else {
                resultado = "Vencedor: " + partida.resultado;
            }

            console.log(`${i + 1}. ${partida.jogador1} x ${partida.jogador2} | ${resultado}`)
        }
    }
    
}

main()