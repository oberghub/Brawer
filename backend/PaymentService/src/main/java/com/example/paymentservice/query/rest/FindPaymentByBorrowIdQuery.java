package com.example.paymentservice.query.rest;

import lombok.Data;

@Data
public class FindPaymentByBorrowIdQuery {
    private String borrowId;
}
