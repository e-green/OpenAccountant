package org.egreen.opensms.server.entity;

import javax.persistence.*;

/**
 * Created by dewmal on 7/31/14.
 */
@Entity
@Table(name = "tempdata")
public class Tempdata implements EntityInterface<String> {
    private String key;
    private String value;

    @Id
    @Column(name = "keyname")
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Basic
    @Column(name = "datavalue")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tempdata tempdata = (Tempdata) o;

        if (key != null ? !key.equals(tempdata.key) : tempdata.key != null) return false;
        if (value != null ? !value.equals(tempdata.value) : tempdata.value != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = key != null ? key.hashCode() : 0;
        result = 31 * result + (value != null ? value.hashCode() : 0);
        return result;
    }


    @Transient
    @Override
    public String getId() {
        return getKey();
    }
}
