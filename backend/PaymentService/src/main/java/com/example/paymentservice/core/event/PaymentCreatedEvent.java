package com.example.paymentservice.core.event;

import lombok.Data;

@Data
public class PaymentCreatedEvent {
    private String _id;
    private String userId;
    private String reserveId;
    private String timestamp;
    private String status;
    private double price;
}
