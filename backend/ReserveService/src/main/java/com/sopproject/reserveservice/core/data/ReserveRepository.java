package com.sopproject.reserveservice.core.data;

import com.sopproject.reserveservice.core.ReserveEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveRepository extends MongoRepository<ReserveEntity, String> {
    @Query("{roomId:'?0'}")
    ReserveEntity findReserveByRoomId(String roomId);

    @Query("{userId:'?0'}")
    ReserveEntity findReserveByUserId(String userId);
}
