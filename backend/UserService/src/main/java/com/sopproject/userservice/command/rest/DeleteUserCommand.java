package com.sopproject.userservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data

public class DeleteUserCommand {
    @TargetAggregateIdentifier
    private final String _id;
}
