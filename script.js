const consumo = {
    // Cozinha — standby
    "microondas": 0.002,
    "forno-eletrico": 0.001,
    "air-fryer": 0.001,
    "cafeteira": 0.001,
    "maquina-cafe": 0.002,
    "panela-eletrica": 0.001,
    "panela-pressao-eletrica": 0.002,

    // Lavanderia / limpeza — standby
    "lava-loucas": 0.001,
    "maquina-lavar": 0.001,
    "lava-seca": 0.001,
    "secadora-roupas": 0.001,
    "aspirador-vertical": 0.001,
    "robo-aspirador": 0.003,

    // Climatização — funcionamento
    "ar-condicionado": 1.000,
    "ar-condicionado-portatil": 0.900,
    "ventilador": 0.060,
    "ventilador-teto": 0.060,
    "climatizador": 0.300,
    "aquecedor-eletrico": 1.500,
    "umidificador": 0.100,
    "desumidificador": 0.350,

    // Água
    "purificador-agua": 0.001,
    "bebedouro": 0.001,

    // Eletrônicos — standby
    "televisao": 0.0005,
    "smart-tv": 0.0005,
    "videogame": 0.002,
    "computador": 0.002,
    "notebook": 0.001,
    "monitor": 0.0005,
    "impressora": 0.003,
    "caixa-som": 0.001,
    "soundbar": 0.001,
    "home-theater": 0.001,
    "projetor": 0.001,
    "decodificador-tv": 0.005,
    "chromecast": 0.002,

    // Outros
    "campainha-eletronica": 0.001,
    "carregador-celular": 0.0003,
    "nobreak": 0.005
};


document.getElementById("bu-1").addEventListener("click", () => {

    // Equipamentos selecionados
    const selecionados = document.querySelectorAll(
        'input[name="equipamentos"]:checked'
    );

    // Consumo total por hora
    let consumoTotal = 0;

    selecionados.forEach(item => {
        consumoTotal += consumo[item.value] || 0;
    });


    // Valores dos inputs
    const primeiro = Number(
        document.getElementById("first-number").value
    );

    const segundo = Number(
        document.getElementById("second-number").value
    );

    const horas = Number(
        document.getElementById("third-number").value
    );


    // Média das duas frequências
    const mediaFrequencia = (primeiro + segundo) / 2;


    // Converter para vezes por mês
    let frequenciaMensal = mediaFrequencia;

    if (document.getElementById("dia").checked) {

        frequenciaMensal *= 30;

    } else if (document.getElementById("semana").checked) {

        frequenciaMensal *= 4;

    } else if (document.getElementById("mes").checked) {

        frequenciaMensal = mediaFrequencia;
    }


    // Horas esquecidas por mês
    const horasEsquecidas = frequenciaMensal * horas;


    // Consumo mensal normal
    const consumoMensal = consumoTotal * 24 * 30;


    // Consumo economizado
    const consumoEconomizado = consumoTotal * horasEsquecidas;


    // Consumo mensal com economia
    const resto = consumoMensal - consumoEconomizado;


    // Alterar diretamente o HTML
    const res1 = document.getElementById("res-1");
    const res2 = document.getElementById("res-2");

    res1.innerHTML = `Seu consumo total aproximado é: ${consumoMensal.toFixed(3)} kWh/mês`;

    res2.innerHTML = `Seu consumo total com economia aproximado é: ${resto.toFixed(3)} kWh/mês`;

});

