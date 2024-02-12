if(localStorage.getItem("token")){
    function inactiveUser(){
        // Limpiar el almacenamiento local después de 15 minutos de inactividad
        const inactivityTimeout = 15 * 60 * 1000;
        let timer;
    
        function resetTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                localStorage.clear();
                alert("Sesión cerrada por inactividad.")
                location.href = "http://127.0.0.1:5500/index.html"
            }, inactivityTimeout);
        }
    
        // Reiniciar el temporizador en cada evento de interacción
        document.addEventListener('click', resetTimer);
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keypress', resetTimer);
    }
    
    // Llamar a la función para iniciarla
    inactiveUser();
}