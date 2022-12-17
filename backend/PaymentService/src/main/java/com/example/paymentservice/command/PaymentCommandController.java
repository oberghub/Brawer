package com.example.paymentservice.command;

import com.example.paymentservice.command.rest.CreatePaymentCommand;
import com.example.paymentservice.command.rest.DeletePaymentCommand;
import com.example.paymentservice.command.rest.PaymentRestModel;
import com.example.paymentservice.command.rest.UpdatePaymentCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentCommandController {

    private final CommandGateway commandGateway;

    @Autowired
    public PaymentCommandController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createPayment(@RequestBody PaymentRestModel model){
        CreatePaymentCommand command = CreatePaymentCommand.builder()
                ._id(new ObjectId().toString())
                .userId(model.getUserId())
                .reserveId(model.getReserveId())
                .status(model.getStatus())
                .timestamp(model.getTimestamp())
                .price(model.getPrice())
                .borrowId(model.getBorrowId())
                .build();
        String result;
        try{
            result = commandGateway.sendAndWait(command);
            return result;
        }catch (Exception e){
            return e.getLocalizedMessage();
        }
    }


    @PutMapping
    public String updatePayment(@RequestBody PaymentRestModel model){
        UpdatePaymentCommand command = UpdatePaymentCommand.builder()
                ._id(model.get_id())
                .userId(model.getUserId())
                .reserveId(model.getReserveId())
                .status(model.getStatus())
                .timestamp(model.getTimestamp())
                .price(model.getPrice())
                .borrowId(model.getBorrowId())
                .build();
        String result;
        try{
            result = commandGateway.sendAndWait(command);
            return result;
        }catch (Exception e){
            return e.getLocalizedMessage();
        }
    }

    @DeleteMapping
    public String deletePayment(@RequestBody PaymentRestModel model){
        DeletePaymentCommand command = DeletePaymentCommand.builder()
                ._id(model.get_id())
                .build();
        String result;
        try{
            result = commandGateway.sendAndWait(command);
            return result;
        }catch (Exception e){
           return e.getLocalizedMessage();
        }
    }
}
