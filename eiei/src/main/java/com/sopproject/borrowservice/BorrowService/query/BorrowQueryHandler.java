package com.sopproject.borrowservice.BorrowService.query;

import com.sopproject.borrowservice.BorrowService.core.BorrowEntity;
import com.sopproject.borrowservice.BorrowService.core.data.BorrowRepository;
import com.sopproject.borrowservice.BorrowService.query.rest.BorrowRestModel;
import com.sopproject.borrowservice.BorrowService.query.rest.FindBorrowQuery;
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
        BeanUtils.copyProperties(allBorrowList, borrowRestModels);

        return borrowRestModels;
    }

}
