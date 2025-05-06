package br.com.estudodecaso.faculdade.estudodecaso.service;

import br.com.estudodecaso.faculdade.estudodecaso.model.Livro;
import br.com.estudodecaso.faculdade.estudodecaso.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Optional<Livro> buscarPorId(Long id) {
        return livroRepository.findById(id);
    }

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public void deletar(Long id) {
        livroRepository.deleteById(id);
    }

    public Livro atualizar(Long id, Livro livroAtualizado) {
        return livroRepository.findById(id).map(livro -> {
            livro.setTitulo(livroAtualizado.getTitulo());
            livro.setAutor(livroAtualizado.getAutor());
            livro.setAno(livroAtualizado.getAno());
            livro.setEditora(livroAtualizado.getEditora());
            livro.setStatus(livroAtualizado.getStatus());
            return livroRepository.save(livro);
        }).orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));
    }
}
