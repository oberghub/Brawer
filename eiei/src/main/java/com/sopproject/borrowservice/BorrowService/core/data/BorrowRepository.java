package com.sopproject.borrowservice.BorrowService.core.data;

import com.sopproject.borrowservice.BorrowService.core.BorrowEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface BorrowRepository extends MongoRepository<BorrowEntity,String> {
    @Query("{bookId:'?0'}")
    BorrowEntity findByBorrowId(String bookId);
}
