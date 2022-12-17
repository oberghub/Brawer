package com.example.paymentservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class DeletePaymentCommand {
    @TargetAggregateIdentifier
    private final String _id;
}
