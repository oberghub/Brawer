package com.sopproject.workspaceservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data

public class DeleteWorkspaceCommand {
    @TargetAggregateIdentifier
    private final String _id;
}
