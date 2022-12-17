package com.sopproject.reserveservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Builder
@Data
public class UpdateReserveCommand {
    @TargetAggregateIdentifier
    private String _id;
    private String userId;
    private String roomId;
    private List<String> equipmentsId;
    private String timestamp;
    private String reserveFrom;
    private String reserveTo;
    private String status;
}
