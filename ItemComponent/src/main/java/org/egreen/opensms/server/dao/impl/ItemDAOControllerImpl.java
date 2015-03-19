package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.ItemDAOController;
import org.egreen.opensms.server.entity.Item;
import org.egreen.opensms.server.model.ItemModel;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by dewmal on 8/19/14.
 */
@Repository
public class ItemDAOControllerImpl extends AbstractDAOController<Item, Long> implements ItemDAOController {


    public ItemDAOControllerImpl() {
        super(Item.class, Long.class);
    }


    @Override
    public List<Item> findItemByQuery(String itemName) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.like("name", itemName, MatchMode.ANYWHERE));
        return criteria.list();
    }

    @Override
    public List<Item> findAllItem() {
        Criteria criteria = getSession().createCriteria(entityType);
        return criteria.list();
    }

    @Override
    public List<ItemModel> findAllfakeQty() {
//        Query query = getSession().createQuery("SELECT  FROM BatchEntity b WHERE b.item=:itemCode AND b.quantity>0");
//        query.setString("itemCode", "IC991");
//        Object valueObj = query.list();
       return null;
    }

    @Override
    public long getItemBatchQty(String id) {
        Query query = getSession().createQuery("SELECT SUM(b.fakequantity) FROM BatchEntity b WHERE b.item=:itemCode AND b.quantity>0");
        query.setString("itemCode", id);
        Object valueObj = query.uniqueResult();
        if (valueObj != null) {
            Double valueOf = Double.valueOf(valueObj + "");
            System.out.println(valueOf);
            return BigDecimal.valueOf(valueOf).longValue();
        }
        return -1;
    }

    @Override
    public List<Item> searchItemModelByItemQty(double qty) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.le("qty", BigDecimal.valueOf(qty)));
        return criteria.list();
    }

    @Override
    public Integer deleteItem(Long itemId) {
        Session session=getSession();
        String hql = "delete from Item where itemId= :itemId";
        int i = session.createQuery(hql).setLong("itemId", itemId).executeUpdate();
        return i;
    }
}
