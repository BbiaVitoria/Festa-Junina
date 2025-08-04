<script>
    // Defina a data do evento (Ano, mês-1, dia, hora, minuto, segundo)
    // O mês é baseado em 0 (Janeiro = 0, Fevereiro = 1, etc.)
    const eventDate = new Date("2025-08-20T18:07:00").getTime(); // Exemplo: 20 de agosto de 2025 às 18:00

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Exibe os resultados nos elementos do HTML
        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

        // Se a contagem terminar, exibe uma mensagem
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-timer").innerHTML = "🎉 O Arraiá Começou! Bora se divertir! 🎉";
        }
    }, 1000);
</script>