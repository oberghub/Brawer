package com.sopproject.workspaceservice.command.rest;

import lombok.Data;

import java.util.List;

@Data
public class WorkspaceRestModel {
    private String _id;
    private String room_type;
    private final String room_name;
    private final List<String> room_capacity;
    private int price;
    private String desc;
    private List<TimeRentModel> time_rent;
    private String status;
}
