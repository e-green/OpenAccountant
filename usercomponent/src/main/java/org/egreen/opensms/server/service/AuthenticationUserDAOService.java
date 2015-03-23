package org.egreen.opensms.server.service;

import org.egreen.opensms.server.controller.AuthenticationUserController;
import org.egreen.opensms.server.dao.AuthenticationUserDAOController;
import org.egreen.opensms.server.entity.AuthenticationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Pramoda Fernando on 3/23/2015.
 */

@Service
public class AuthenticationUserDAOService {

    @Autowired
    private AuthenticationUserDAOController authenticationUserDAOController;

    public Long saveAuthentication(AuthenticationUser authenticationUser) {

        return authenticationUserDAOController.create(authenticationUser);
    }
}
