package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.SupplierDAOController;
import org.egreen.opensms.server.entity.Supplier;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Pramoda Fernando on 10/3/2014.
 */
@Repository
public class SupplierDAOControllerImpl extends AbstractDAOController<Supplier,Long>implements SupplierDAOController {
    public SupplierDAOControllerImpl() {
        super(Supplier.class,Long.class);
    }

    @Override
    public List<Supplier> findAllVendor() {
        Criteria criteria = getSession().createCriteria(entityType);
        return criteria.list();
    }

    @Override
    public Integer deleteSupplier(Long supplierId) {
        Session session=getSession();
        String hql = "delete from Supplier where supplierId= :supplierId";
        int i = session.createQuery(hql).setLong("supplierId",supplierId).executeUpdate();
        return i;
    }
}