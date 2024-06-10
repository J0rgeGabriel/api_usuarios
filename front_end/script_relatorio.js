document.addEventListener("DOMContentLoaded", function() {
    const usuariosSelect = document.getElementById("usuariosSelect");
    const generateReportButton = document.getElementById("generateReportButton");

    console.log("Tentando carregar usuários da API...");

    let usuariosData = [];

    fetch('http://localhost:8080/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos da API:", data);
            usuariosData = data;
            data.forEach(usuario => {
                const option = document.createElement("option");
                option.value = usuario.id; // Assumindo que cada usuário tem um ID
                option.textContent = usuario.nome; // Assumindo que cada usuário tem um nome
                usuariosSelect.appendChild(option);
            });

            // Adicionar event listener para o botão "Relatório"
            generateReportButton.addEventListener("click", function() {
                const selectedUserId = usuariosSelect.value;
                if (selectedUserId) {
                    const selectedUser = usuariosData.find(usuario => usuario.id == selectedUserId);
                    if (selectedUser) {
                        generateReport(selectedUser);
                    } else {
                        console.error('Usuário não encontrado');
                    }
                } else {
                    console.error('Nenhum usuário selecionado');
                }
            });
        })
        .catch(error => console.error('Erro ao carregar usuários:', error));

    function generateReport(usuario) {
        // Formatar os dados do usuário em texto
        let reportContent = "Relatório de Usuário:\n\n";
        reportContent += `ID: ${usuario.id}\n`;
        reportContent += `Nome: ${usuario.nome}\n`;
        reportContent += `Email: ${usuario.email}\n`;
        reportContent += `Senha: ${usuario.senha}\n`;
        reportContent += `Telefone: ${usuario.telefone}\n`;

        // Criar um arquivo blob com o conteúdo do relatório
        const blob = new Blob([reportContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        // Criar um link para download
        const a = document.createElement("a");
        a.href = url;
        a.download = `relatorio_usuario_${usuario.nome}.txt`;
        a.click();

        // Revogar o objeto URL para liberar memória
        URL.revokeObjectURL(url);
    }
});