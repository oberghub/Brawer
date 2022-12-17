package com.sopproject.reserveservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data

public class DeleteReserveCommand {
    @TargetAggregateIdentifier
    private final String _id;
}
