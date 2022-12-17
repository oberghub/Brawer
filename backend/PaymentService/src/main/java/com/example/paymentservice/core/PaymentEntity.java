package com.example.paymentservice.core;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("payments")
public class PaymentEntity {
    @Id
    private String _id;
    private String userId;
    private String reserveId;
    private String timestamp;
    private String status;
    private double price;
}
