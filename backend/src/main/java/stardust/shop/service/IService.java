package stardust.shop.service;

import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IService<T, ID> {

    List<T> getAll(Pageable p);

    T getById(ID id);

    T create(T entity);

    T update(T entity, ID id);

    void delete(ID id);
}
