package com.sopproject.reserveservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Data
@Builder
public class CreateReserveCommand {
    @TargetAggregateIdentifier
    private String _id;
    private String userId;
    private String roomId;
    private List<String> equipmentsId;
    private String timestamp;
    private String reserveForm;
    private String reserveTo;
    private String status;
}
