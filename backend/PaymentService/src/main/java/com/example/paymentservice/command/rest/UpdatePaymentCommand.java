package com.example.paymentservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class UpdatePaymentCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String userId;
    private final String reserveId;
    private final String timestamp;
    private final String status;
    private final double price;
    private final String borrowId;
}
