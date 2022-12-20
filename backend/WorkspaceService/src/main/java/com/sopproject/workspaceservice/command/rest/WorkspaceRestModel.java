package com.sopproject.workspaceservice.command.rest;

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

    public WorkspaceRestModel(String _id, String room_type, String room_name, List<String> room_capacity, int price, String desc, List<TimeRentModel> time_rent, String status) {
        this._id = _id;
        this.room_type = room_type;
        this.room_name = room_name;
        this.room_capacity = room_capacity;
        this.price = price;
        this.desc = desc;
        this.time_rent = time_rent;
        this.status = status;
    }

    public WorkspaceRestModel() {
    }
}
