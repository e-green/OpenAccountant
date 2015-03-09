package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: sadika
 * Date: 10/14/13
 * Time: 9:07 AM
 * To change this template use File | Settings | File Templates.
 */
public interface EntityInterface <E> extends Serializable{


    @JsonIgnore
    public E getId();
}
