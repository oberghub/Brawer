package com.sopproject.workspaceservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Builder
@Data
public class SetWorkspaceStatusCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String status;
}
