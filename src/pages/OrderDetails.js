import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import moment from 'moment';

function OrderDetails() {

    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
    const [customerIds, setCustomerIds] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get('https://northwind.vercel.app/api/orders')
            .then(res => {
                const data = res.data;
                const uniqueCustomerIds = [...new Set(data.map(item => item.customerId))];
                setproducts(data);
                setloading(false);
                setCustomerIds(uniqueCustomerIds);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const rowClassName = (record) => {
        const requiredDate = moment(record.requiredDate);
        const shippedDate = moment(record.shippedDate);
        if (requiredDate.isValid() && shippedDate.isValid() && shippedDate > requiredDate) {
            return 'red-row';
        }
        return '';
    };

    let columns = [
        {
            title: 'Customer Id',
            dataIndex: 'customerId',
            key: 'customerId',
            filters: customerIds.map(id => ({
                text: id,
                value: id,
                dropdownMatchSelectWidth: false,
            })),
            onFilter: (value, record) => record.customerId.toString() === value,
        },
        {
            title: 'Freight',
            dataIndex: 'freight',
            key: 'freight',
            sorter: (a, b) => a.freight - b.freight,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Ship Address City',
            dataIndex: ['shipAddress', 'city'],
            key: ['shipAddress', 'city'],
        },
        {
            title: 'Ship Address Country',
            dataIndex: ['shipAddress', 'country'],
            key: ['shipAddress', 'country'],
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (date) => moment(date).format('MMMM Do YY'),
        },
        {
            title: 'Required Date',
            dataIndex: 'requiredDate',
            key: 'requiredDate',
            render: (date) => moment(date).format('MMMM Do YY'),
        },
        {
            title: 'Shipped Date',
            dataIndex: 'shippedDate',
            key: 'shippedDate',
            render: (date) => moment(date).format('MMMM Do YY'),
        }
    ]

    return (
        <>
            <Table
                dataSource={products.map((item, index) => ({ ...item, key: index }))}
                columns={columns}
                loading={loading}
                rowClassName={rowClassName}
            />
        </>
    );
}

export default OrderDetails;