package com.sopproject.workspaceservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Builder
@Data
public class UpdateWorkspaceCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String room_type;
    private final String room_name;
    private final List<String> room_capacity;
    private final int price;
    private final String desc;
    private final List<TimeRentModel> time_rent;
    private final String status;
}
