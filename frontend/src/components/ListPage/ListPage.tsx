import { Table, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './ListPage.module.css';

interface ListPageProps {
    title: string;
    model: string;
    data: any[];
    columns: any[];
    loading: boolean;
    addLink: string;
    emptyMessage: string;
}

const ListPage = ({
    title,
    model,
    data,
    columns,
    loading,
    addLink,
    emptyMessage,
}: ListPageProps) => {
    if (loading) return <Spin className={styles.loading} />;

    return (
        <div className={styles.container}>
            {data.length === 0 ? (
                <>
                    <div className={styles.headerRow}>
                        <h2 className={styles.title}>{title}</h2>
                    </div>
                    <div className={styles.emptyState}>
                        <h3 className={styles.emptyText}>{emptyMessage}</h3>
                        <Button
                            type="primary"
                            href={addLink}
                            className={styles.addButton}
                            icon={<PlusOutlined />}
                        >
                            Add {model}
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.headerRow}>
                        <h2 className={styles.title}>{title}</h2>
                        <Button
                            type="primary"
                            href={addLink}
                            className={styles.addButton}
                            icon={<PlusOutlined />}
                        >
                            Add {model}
                        </Button>
                    </div>
                    <div className={styles.card}>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ListPage;
