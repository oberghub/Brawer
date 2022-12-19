package com.sopproject.userservice.core.data;

import com.sopproject.userservice.core.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    @Query("{email: '?0'}")
    UserEntity findByEmail(String email);
}
