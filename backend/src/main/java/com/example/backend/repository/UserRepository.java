package com.example.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.*;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
        public User findById(long id);

        public void deleteById(long id);
}
