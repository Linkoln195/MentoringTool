import { Button, Form, Input, message } from 'antd';
import classes from './Login.module.css'
import axios from 'axios'


const Login = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        console.log('Success:', values);
        axios
            .post('http://localhost:5000/login', values)
            .then(async (response) => {
                response = response.data
                await localStorage.setItem('mentorID', response);
                location.href = 'http://localhost:5173/home'
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: error.response.data.message,
                });
                console.log(error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<div className={classes.formBox}>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                {contextHolder}
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    </div>)
}
export default Login;
