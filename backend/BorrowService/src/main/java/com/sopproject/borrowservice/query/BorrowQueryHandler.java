package com.sopproject.borrowservice.query;

import com.sopproject.borrowservice.core.BorrowEntity;
import com.sopproject.borrowservice.core.data.BorrowRepository;
import com.sopproject.borrowservice.query.rest.BorrowRestModel;
import com.sopproject.borrowservice.query.rest.FindBorrowByUserIdQuery;
import com.sopproject.borrowservice.query.rest.FindBorrowQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BorrowQueryHandler {
    @Autowired
    private BorrowRepository borrowRepository;

    @QueryHandler
    public List<BorrowRestModel> findBorrow(FindBorrowQuery query){
        List<BorrowRestModel> borrowRestModels = new ArrayList<>();
        List<BorrowEntity> allBorrowList = borrowRepository.findAll();
        for(BorrowEntity borrowEntity : allBorrowList){
            BorrowRestModel borrowRestModel = new BorrowRestModel();
            BeanUtils.copyProperties(borrowEntity, borrowRestModel);
            borrowRestModels.add(borrowRestModel);
        }
        return borrowRestModels;
    }

    @QueryHandler
    public List<BorrowRestModel> findBorrowByUserId(FindBorrowByUserIdQuery query){
        List<BorrowRestModel> borrowRestModels = new ArrayList<>();
        List<BorrowEntity> borrowEntities = borrowRepository.findBorrowByUserId(query.getUserId());
        for(BorrowEntity entity: borrowEntities){
            BorrowRestModel borrowRestModel = new BorrowRestModel();
            BeanUtils.copyProperties(entity, borrowRestModel);
            borrowRestModels.add(borrowRestModel);
        }
        return borrowRestModels;
    }

}
