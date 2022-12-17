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
    PaymentEntity findByPaymentId(String paymentId);

}

