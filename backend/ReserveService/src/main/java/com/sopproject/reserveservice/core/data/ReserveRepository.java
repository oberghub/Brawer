package com.sopproject.reserveservice.core.data;

import com.sopproject.reserveservice.core.ReserveEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReserveRepository extends MongoRepository<ReserveEntity, String> {
    @Query("{_id:'?0'}")
    ReserveEntity findReserveById(String _id);

    @Query("{userId:'?0'}")
    List<ReserveEntity> findReserveByUserId(String userId);
}
