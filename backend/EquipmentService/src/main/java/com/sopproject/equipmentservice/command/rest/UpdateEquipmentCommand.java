package com.sopproject.equipmentservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class UpdateEquipmentCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String name;
    private final String desc;
    private final Integer price;
}
