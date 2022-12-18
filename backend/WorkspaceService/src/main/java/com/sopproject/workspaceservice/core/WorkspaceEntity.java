package com.sopproject.workspaceservice.core;

import com.sopproject.workspaceservice.command.rest.TimeRentModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Document("workspaces")
public class WorkspaceEntity implements Serializable {
    @Id
    private String _id;
    private String room_type;
    private String room_name;
    private List<String> room_capacity;
    private int price;
    private String desc;
    private List<TimeRentModel> time_rent;
    private String status;

}
