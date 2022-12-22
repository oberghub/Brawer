package com.example.userservice.core.data;

import com.example.userservice.core.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    @Query("{email: '?0'}")
    UserEntity findByEmail(String email);

    @Query("{_id:'?0'}")
    UserEntity findByUserId(String id);
}
