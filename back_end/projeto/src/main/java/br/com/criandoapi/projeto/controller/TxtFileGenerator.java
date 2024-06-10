package br.com.criandoapi.projeto.controller;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import br.com.criandoapi.projeto.model.Usuario;
public class TxtFileGenerator {

    public static void gerarArquivoTxt(List<Usuario> usuarios, String caminhoArquivo) {
        try (FileWriter writer = new FileWriter(caminhoArquivo)) {
            for (Usuario usuario : usuarios) {
                writer.write(usuario.toString() + "\n");
            }
            System.out.println("Arquivo gerado com sucesso em: " + caminhoArquivo);
        } catch (IOException e) {
            System.err.println("Erro ao gerar o arquivo: " + e.getMessage());
        }
    }
}
