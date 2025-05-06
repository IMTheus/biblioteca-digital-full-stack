package br.com.estudodecaso.faculdade.estudodecaso.repository;

import br.com.estudodecaso.faculdade.estudodecaso.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    // Aqui podemos adicionar métodos personalizados no futuro, como buscar por título, etc.
}
