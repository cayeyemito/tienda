// dispositivos móviles
        document.querySelector('.toggle-sidebar').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('show');
        });
        
        // Cerrar sidebar al seleccionar un chat en móviles
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    document.getElementById('sidebar').classList.remove('show');
                }
                
                // Activar chat seleccionado
                chatItems.forEach(chat => chat.classList.remove('active'));
                this.classList.add('active');
            });
        });
