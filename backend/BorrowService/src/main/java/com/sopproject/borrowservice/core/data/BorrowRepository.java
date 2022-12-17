package com.sopproject.borrowservice.core.data;

import com.sopproject.borrowservice.core.BorrowEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface BorrowRepository extends MongoRepository<BorrowEntity,String> {
    @Query("{borrowId:'?0'}")
    BorrowEntity findByBorrowId(String borrowId);
}
