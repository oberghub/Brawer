package com.sopproject.workspaceservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/workspace")
public class WorkspaceQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<WorkspaceRestModel> findWorkspacesQuery(){
        WorkspaceQuery findWorkspacesQuery = new WorkspaceQuery();
        List<WorkspaceRestModel> Workspaces = queryGateway
                .query(findWorkspacesQuery, ResponseTypes.multipleInstancesOf(WorkspaceRestModel.class)).join();

        return Workspaces;
    }
    @GetMapping("/{id}")
    public WorkspaceRestModel findWorkspaceById(@PathVariable String id){
        FindWorkspaceByIdQuery findWorkspaceByIdQuery = new FindWorkspaceByIdQuery();
        findWorkspaceByIdQuery.setId(id);
        WorkspaceRestModel workspace = queryGateway
                .query(findWorkspaceByIdQuery, ResponseTypes.instanceOf(WorkspaceRestModel.class)).join();

        return workspace;
    }
    @GetMapping("/type/{room_type}")
    public List<WorkspaceRestModel> findByRoom_type(@PathVariable String room_type){
        FindByRoom_typeQuery findByRoomTypeQuery = new FindByRoom_typeQuery();
        findByRoomTypeQuery.setRoom_type(room_type);
        List<WorkspaceRestModel> workspaces = queryGateway
                .query(findByRoomTypeQuery, ResponseTypes.multipleInstancesOf(WorkspaceRestModel.class)).join();

        return workspaces;
    }
}
