package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by dewmal on 8/19/14.
 */
@Entity
@Table(name = "brand")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Brand implements EntityInterface<Long>{
    private Long brandId;
    private String brandName;
    private Long supplierId;


    @Id
    @Column(name = "brand_id", nullable = false, insertable = true, updatable = true)
    public Long getBrandId() {
        return brandId;
    }

    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }

    @Basic
    @Column(name = "brand_name")
    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    @Basic
    @Column(name = "supplier_id")
    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Brand brand = (Brand) o;

        if (brandId != null ? !brandId.equals(brand.brandId) : brand.brandId != null) return false;
        if (brandName != null ? !brandName.equals(brand.brandName) : brand.brandName != null) return false;
        if (supplierId != null ? !supplierId.equals(brand.supplierId) : brand.supplierId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = brandId != null ? brandId.hashCode() : 0;
        result = 31 * result + (brandName != null ? brandName.hashCode() : 0);
        result = 31 * result + (supplierId != null ? supplierId.hashCode() : 0);
        return result;
    }

    @Override
    @Transient
    public Long getId() {
        return getBrandId();
    }


    @Override
    public String toString() {
        return "Brand{" +
                "brandId=" + brandId +
                ", brandName='" + brandName + '\'' +
                ", supplierId=" + supplierId +
                '}';
    }
}
