package com.sopproject.workspaceservice.query.rest;

import com.sopproject.workspaceservice.command.rest.TimeRentModel;
import lombok.Data;

import java.util.List;

@Data
public class WorkspaceRestModel {
    private String _id;
    private String room_type;
    private String room_name;
    private List<String> room_capacity;
    private int price;
    private String desc;
    private List<TimeRentModel> time_rent;
    private String status;
}
