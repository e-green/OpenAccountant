package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.AuthenticationUser;
import org.egreen.opensms.server.service.AuthenticationUserDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Pramoda Fernando on 3/23/2015.
 */

@Controller
@RequestMapping("mintbooks/v1/auth_user/")
public class AuthenticationUserController {

    @Autowired
    private AuthenticationUserDAOService authenticationUserDAOService;

    @RequestMapping(value = "save",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage saveAuthentication(@RequestBody AuthenticationUser authenticationUser){

        Long res = authenticationUserDAOService.saveAuthentication(authenticationUser);
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }


    @RequestMapping(value = "ob",method = RequestMethod.GET)
    @ResponseBody
    public AuthenticationUser getob(){
        return new AuthenticationUser();
    }


}
