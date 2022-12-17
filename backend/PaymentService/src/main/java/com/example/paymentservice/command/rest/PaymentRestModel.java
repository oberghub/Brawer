package com.example.paymentservice.command.rest;

import lombok.Data;

@Data
public class PaymentRestModel {
    private String _id;
    private String userId;
    private String reserveId;
    private String timestamp;
    private String status;
    private double price;
}
