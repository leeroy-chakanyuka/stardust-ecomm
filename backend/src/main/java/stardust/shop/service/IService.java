package stardust.shop.service;

import java.util.List;

public interface IService<T, ID> {

    List<T> getAll();

    T getById(ID id);

    T create(T entity);

    T update(T entity, ID id);

    void delete(ID id);
}
