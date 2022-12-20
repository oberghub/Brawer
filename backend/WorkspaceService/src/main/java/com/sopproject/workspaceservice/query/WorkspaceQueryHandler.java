package com.sopproject.workspaceservice.query;

import com.sopproject.workspaceservice.core.WorkspaceEntity;
import com.sopproject.workspaceservice.core.data.WorkspaceRepository;
import com.sopproject.workspaceservice.query.rest.FindByRoom_typeQuery;
import com.sopproject.workspaceservice.query.rest.FindWorkspaceByIdQuery;
import com.sopproject.workspaceservice.query.rest.WorkspaceQuery;
import com.sopproject.workspaceservice.query.rest.WorkspaceRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkspaceQueryHandler {

    private final WorkspaceRepository workspaceRepository;
    public WorkspaceQueryHandler(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    @QueryHandler
    List<WorkspaceRestModel> findWorkspaces(WorkspaceQuery query){
        List<WorkspaceRestModel> workspaceRestModels = new ArrayList<>();
        List<WorkspaceEntity> storedWorkspaces = workspaceRepository.findAll();
        for (WorkspaceEntity workspaceEntity : storedWorkspaces){
            WorkspaceRestModel workspaceRestModel = new WorkspaceRestModel();
            BeanUtils.copyProperties(workspaceEntity, workspaceRestModel);
            workspaceRestModels.add(workspaceRestModel);
        }
        return workspaceRestModels;
    }
    @QueryHandler
    WorkspaceRestModel findWorkspaceById(FindWorkspaceByIdQuery query){
        WorkspaceRestModel workspaceRestModel = new WorkspaceRestModel();
        WorkspaceEntity workspace = workspaceRepository.findWorkspaceById(query.getId());
        BeanUtils.copyProperties(workspace, workspaceRestModel);

        return workspaceRestModel;
    }

    @QueryHandler
    List<WorkspaceRestModel> findByRoom_type(FindByRoom_typeQuery query){
        List<WorkspaceRestModel> workspaceRestModels = new ArrayList<>();
        List<WorkspaceEntity> storedWorkspaces = workspaceRepository.findByRoom_type(query.getRoom_type());
        for (WorkspaceEntity workspaceEntity : storedWorkspaces){
            WorkspaceRestModel workspaceRestModel = new WorkspaceRestModel();
            BeanUtils.copyProperties(workspaceEntity, workspaceRestModel);
            workspaceRestModels.add(workspaceRestModel);
        }

        return workspaceRestModels;
    }
}
