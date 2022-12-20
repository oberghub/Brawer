package com.sopproject.equipmentservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class QtyIncreaseCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final int quantity;
}
