import { Divider, List, Typography, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Home.module.css'


const Home = (getFormData) => {
    const [data, setData] = useState([])

    getFormData = getFormData.getFormData

    const getData = async () => {
        await axios.get('https://mentoringtoolclient.onrender.com/students-info')
            .then((response) => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const onMentiClick = async (item) => {
        item = {
            name: item,
            id: localStorage.getItem('mentorID')
        }
        await axios.post('http://localhost:5000/new-mentor', item).then(getData())
    }

    const onDeleteClick = async (item) => {
        await axios.post('http://localhost:5000/delete-menti', { item }).then(getData())
    }

    return (
        <>
            <Divider orientation="left">Menti-List</Divider>
            <List
                header={<div>New</div>}
                footer={<div>Old</div>}
                bordered
                dataSource={data}
                renderItem={(item) => {

                    if (item.split(' ').length > 2) {

                        const itemID = item.split(' ')[6]

                        item = item.split(' ');
                        item[6] = '';

                        item = item.join(' ');

                        if (itemID == localStorage.getItem('mentorID')) {
                            return (
                                <List.Item>
                                    <Typography.Text mark>[MENTI]</Typography.Text> {item}
                                    <Button onClick={() => onDeleteClick(item)} className={classes.deleteButton}>Delete Menti</Button>
                                    <Link to="/form" params={{ testvalue: "hello" }}><Button className={classes.formButton} onClick={() => getFormData(item)}>Check Form</Button></Link>
                                </List.Item>
                            )
                        } else {
                            return (
                                <List.Item>
                                    <Typography.Text mark>[MENTI]</Typography.Text> {item}
                                </List.Item>
                            )
                        }

                    } else {

                        return (
                            <List.Item>
                                <Typography.Text mark>[MENTI]</Typography.Text> {item}
                                <Button className={classes.liButton} onClick={() => onMentiClick(item)}>+</Button>
                            </List.Item>
                        )

                    }
                }}
            />
        </>
    )

}

export default Home;
