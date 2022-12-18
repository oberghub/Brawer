package com.sopproject.equipmentservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data

public class DeleteEquipmentCommand {
    @TargetAggregateIdentifier
    private final String _id;
}
