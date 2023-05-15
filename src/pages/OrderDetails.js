import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

function ProductList() {

    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);
    const [customerIds, setCustomerIds] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get('https://northwind.vercel.app/api/orders')
            .then(res => {
                const data = res.data;
                const uniqueCustomerIds = [...new Set(data.map(item => item.customerId))];
                setproducts(data);
                setFilteredData(data);
                setloading(false);
                setCustomerIds(uniqueCustomerIds);
            })
    }
    let columns = [
        {
            title: 'Customer Id',
            dataIndex: 'customerId',
            key: 'customerId',
            filters: customerIds.map(id => ({
                text: id,
                value: id,
            })),
        },
        {
            title: 'Freight',
            dataIndex: 'freight',
            key: 'freight',
            sorter: (a, b) => a.freight - b.freight,
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
        },
        {
            title: 'Required Date',
            dataIndex: 'requiredDate',
            key: 'requiredDate',
        },
        {
            title: 'Shipped Date',
            dataIndex: 'shippedDate',
            key: 'shippedDate',
        }
    ]
    return (
        <>
            <Table
                dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
                columns={columns}
                loading={loading}
                onChange={(pagination, filters, sorter) => {
                    // Filtrelenmiş verileri al
                    const filteredData = products.filter(item =>
                        filters.customerId?.includes(item.customerId.toString())
                    );

                    setFilteredData(filteredData);
                }}
            />
        </>
    );
}

export default ProductList;