'use client'

import api from '@/utils/api'
import { Table } from 'antd';
import { useEffect, useState } from 'react'



export default function page({ }) {
    const [words, setWords] = useState<any>(null);

    useEffect(() => {
        getWords();
    }, [])

    const getWords = async () => {
        const words: any = await api.get('/admin/words')
        setWords(words);
    }

    const columns = [
        {
            title: 'French',
            dataIndex: 'foreign',
            key: 'foreign',
        },
        {
            title: 'English',
            dataIndex: 'native',
            key: 'native',
        },
        {
            title: 'List',
            dataIndex: 'list',
            key: 'list',
            render: (_: string, record: any) => record.list.title
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Due',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
    ];


    return (
        <div>
            {words && (
                <Table dataSource={words} columns={columns} />
            )}
        </div>
    )
}