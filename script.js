const consumo = {
    "ar-condicionado": 0.5,
    "ar-condicionado-portatil": 0.4,
    "ventilador": 0.05,
    "ventilador-teto": 0.5,
    "climatizador": 0.125,
    "aquecedor-eletrico": 0.5,
    "umidificador": 0.07,
    "desumidificador": 0.5,
    "televisao": 0.140,
    "videogame": 0.125,
    "computador": 0.350,
    "monitor": 0.040,
    "caixa-som": 0.10,
    "projetor": 0.250,
};

const consumoMedio = 0.2;

// Fator de correção
const fatorCorrecao = 0.65;

const standby = {
    "microondas": 0.002,
    "forno-eletrico": 0.0015,
    "air-fryer": 0.0015,
    "cafeteira": 0.0015,
    "panela-eletrica": 0.0015,
    "panela-pressao-eletrica": 0.0015,
    "lava-loucas": 0.001,
    "maquina-lavar": 0.001,
    "lava-seca": 0.00175,
    "secadora-roupas": 0.001,
    "aspirador-vertical": 0.0005,
    "robo-aspirador": 0.001,
    "bebedouro": 0.030,
    "televisao": 0.001,
    "videogame": 0.002,
    "computador": 0.003,
    "monitor": 0.0005,
    "impressora": 0.003,
    "caixa-som": 0.003,
    "projetor": 0.0015,
    "chromecast": 0.002,
    "campainha-eletronica": 0.002,
    "ar-condicionado": 0.002,
    "ar-condicionado-portatil": 0.002,
    "climatizador": 0.001,
    "umidificador": 0.0005,
    "desumidificador": 0.002,
    "aquecedor-eletrico": 0.001,
    "ventilador": 0.0005,
    "ventilador-teto": 0.001,
};

document.getElementById("bu-1").addEventListener("click", () => {

    // Equipamentos que a pessoa possui
    const selecionados1 = document.querySelectorAll(
        'input[name="equipamentos"]:checked'
    );

    let consumoTotalby = 0;

    selecionados1.forEach(item => {
        consumoTotalby += standby[item.value] || 0;
    });


    // Equipamentos que a pessoa costuma utilizar
    const selecionados2 = document.querySelectorAll(
        'input[name="equipamentos2"]:checked'
    );

    let consumototaltotal = 0;
    let quantidade = 0;

    selecionados2.forEach(item => {
        consumototaltotal += consumo[item.value] || 0;
        quantidade += 1;
    });


    if (quantidade === 0) {
        document.getElementById("res-3").innerHTML =
            "Selecione pelo menos um dispositivo que você costuma utilizar.";

        document.getElementById("res-2").innerHTML = "";
        document.getElementById("res-1").innerHTML = "";

        return;
    }


    // Quantidade de equipamentos esquecidos
    let quantidadeEsquecida = 1;

    if (document.getElementById("q1").checked) {
        quantidadeEsquecida = 1;
    } else if (document.getElementById("q2").checked) {
        quantidadeEsquecida = 2;
    } else if (document.getElementById("q3").checked) {
        quantidadeEsquecida = 3;
    } else if (document.getElementById("q4").checked) {
        quantidadeEsquecida = 4;
    } else if (document.getElementById("q5").checked) {
        quantidadeEsquecida = 5;
    } else if (document.getElementById("q6").checked) {
        quantidadeEsquecida = 6;
    }


    // Potência dos equipamentos selecionados
    // + estimativa para equipamentos não especificados
    const potenciaEquipamentos =
        consumototaltotal +
        Math.max(0, quantidadeEsquecida - quantidade) * consumoMedio;


    // Frequência de esquecimento
    let frequenciaEsquecimento = 0.5;

    if (document.getElementById("0").checked) {
        frequenciaEsquecimento = 0.5;
    } else if (document.getElementById("1").checked) {
        frequenciaEsquecimento = 1;
    } else if (document.getElementById("2").checked) {
        frequenciaEsquecimento = 2;
    } else if (document.getElementById("3").checked) {
        frequenciaEsquecimento = 3;
    } else if (document.getElementById("4").checked) {
        frequenciaEsquecimento = 4;
    } else if (document.getElementById("5").checked) {
        frequenciaEsquecimento = 5;
    } else if (document.getElementById("6").checked) {
        frequenciaEsquecimento = 6;
    } else if (document.getElementById("7").checked) {
        frequenciaEsquecimento = 7;
    }


    // Tempo fora de casa
    const numbersaidas = Number(
        document.getElementById("saidas-semana").value
    );

    const horasfora = Number(
        document.getElementById("number-tempo-sair").value
    );


    // =========================================================
    // CONSUMO NORMAL
    // =========================================================

    // 4 horas de uso por dia
    // Fator de correção aplicado
    const consumoEquipamentos =
        potenciaEquipamentos * 4 * 30 * fatorCorrecao;


    // Consumo em standby
    // O fator de correção não é aplicado ao standby
    const consumoStandby =
        consumoTotalby * 24 * 30;


    // =========================================================
    // CONSUMO CAUSADO PELOS ESQUECIMENTOS
    // =========================================================

    // Potência × esquecimentos por semana × horas fora × 4 semanas
    // Fator de correção aplicado
    const consumoEsquecimentos =
        potenciaEquipamentos *
        frequenciaEsquecimento *
        horasfora *
        4 *
        fatorCorrecao;


    // Consumo total antes da economia
    const consumoMensal =
        consumoStandby +
        consumoEquipamentos +
        consumoEsquecimentos;


    // =========================================================
    // ECONOMIA
    // =========================================================

    // Economia do standby durante as saídas
    const economiaStandby =
        consumoTotalby *
        horasfora *
        numbersaidas;


    // Economia dos equipamentos que seriam esquecidos
    const economiaEquipamentos =
        consumoEsquecimentos;


    const consumoEconomizado =
        economiaStandby +
        economiaEquipamentos;


    // Evita que a economia ultrapasse o consumo total
    const consumoEconomizadoFinal = Math.min(
        consumoEconomizado,
        consumoMensal
    );


    // Consumo depois da economia
    const resto =
        consumoMensal -
        consumoEconomizadoFinal;


    // =========================================================
    // RESULTADOS
    // =========================================================

    const res1 = document.getElementById("res-1");
    const res2 = document.getElementById("res-2");

    res1.innerHTML =
        `R$${consumoMensal.toFixed(2)}`;

    res2.innerHTML =
        `R$${resto.toFixed(2)}`;
});
