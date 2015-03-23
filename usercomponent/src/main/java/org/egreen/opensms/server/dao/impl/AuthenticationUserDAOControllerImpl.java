package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.AuthenticationUserDAOController;
import org.egreen.opensms.server.entity.AuthenticationUser;
import org.springframework.stereotype.Repository;

/**
 * Created by Pramoda Fernando on 3/23/2015.
 */

@Repository
public class AuthenticationUserDAOControllerImpl extends AbstractDAOController<AuthenticationUser, Long> implements AuthenticationUserDAOController {
    public AuthenticationUserDAOControllerImpl() {
        super(AuthenticationUser.class,Long.class);
    }
}
