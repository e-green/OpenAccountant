package org.egreen.opensms.server.entity;

import javax.persistence.*;

/**
 * Created by Pramoda Fernando on 10/3/2014.
 */
@Entity
@Table(name = "supplier")
public class Supplier implements EntityInterface<Long> {
    private Long supplierId;
    private String supplierName;
    private String contactNumber ;

    @Id
    @Column(name = "supplier_id")
    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    @Basic
    @Column(name = "supplier_name")
    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    @Basic
    @Column(name = "contact_number")
    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Supplier supplier = (Supplier) o;

        if (contactNumber != null ? !contactNumber.equals(supplier.contactNumber) : supplier.contactNumber != null)
            return false;
        if (supplierId != null ? !supplierId.equals(supplier.supplierId) : supplier.supplierId != null) return false;
        if (supplierName != null ? !supplierName.equals(supplier.supplierName) : supplier.supplierName != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = supplierId != null ? supplierId.hashCode() : 0;
        result = 31 * result + (supplierName != null ? supplierName.hashCode() : 0);
        result = 31 * result + (contactNumber != null ? contactNumber.hashCode() : 0);
        return result;
    }

    @Override
    @Transient
    public Long getId() {
        return getSupplierId();
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "supplierId=" + supplierId +
                ", supplierName='" + supplierName + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                '}';
    }
}
