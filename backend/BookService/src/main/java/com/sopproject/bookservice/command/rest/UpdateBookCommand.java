package com.sopproject.bookservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Builder
@Data
public class UpdateBookCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String title;
    private final String desc;
    private final int quantity;
    private final List<String> authors;
    private final String image;
    private final String language;
    private final List<String> genres;
}
