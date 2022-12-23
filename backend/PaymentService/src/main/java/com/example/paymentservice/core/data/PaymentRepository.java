package com.example.paymentservice.core.data;

import com.example.paymentservice.core.PaymentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository  extends MongoRepository<PaymentEntity, String> {
    @Query("{userId: '?0'}")
    List<PaymentEntity> findByUserId(String userId);
    @Query("{_id:'?0'}")
    PaymentEntity findByPaymentId(String _id);
    @Query("{reserveId: '?0'}")
    PaymentEntity findByReserveId(String reserveId);

    @Query("{borrowId: '?0'}")
    PaymentEntity findByBorrowId(String borrowId);

}

